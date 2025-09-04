import leaflet from 'leaflet';
import { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaSearch, FaSpinner, FaDirections } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';

export default function GPSMapWithReactIcon() {
  const map_api = import.meta.env.VITE_MAP_API;
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const [position, setPosition] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  // Initialize map and geolocation
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map('map').setView([0, 0], 13);
      
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);
    }

    const createCustomIcon = (color = 'red') => {
      const iconString = renderToString(
        <div style={{ color: color, fontSize: '24px' }}>
          <FaMapMarkerAlt />
        </div>
      );
      
      return leaflet.divIcon({
        html: iconString,
        className: 'custom-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = [latitude, longitude];
          setPosition(newPos); 

          mapRef.current.setView(newPos, 13);
          
          if (currentMarkerRef.current) {
            currentMarkerRef.current.setLatLng(newPos);
          } else {
            currentMarkerRef.current = leaflet.marker(newPos, {
              icon: createCustomIcon('#3388ff')
            }).addTo(mapRef.current)
              .bindPopup("Your current location")
              .openPopup();
          }

          // If we have a destination, recalculate route
          if (destination) {
            calculateRoute(newPos, destination);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setSearchError("Could not get your current location");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.length === 0) throw new Error('Location not found');
      
      const result = data[0];
      const newPos = [parseFloat(result.lat), parseFloat(result.lon)];
      setDestination(newPos);
      
      // Add or update destination marker
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setLatLng(newPos)
          .setPopupContent(`Destination: ${result.display_name || searchQuery}`)
          .openPopup();
      } else {
        destinationMarkerRef.current = leaflet.marker(newPos, {
          icon: createCustomIcon('#ff0000')
        }).addTo(mapRef.current)
          .bindPopup(`Destination: ${result.display_name || searchQuery}`)
          .openPopup();
      }
      
      // Fit bounds to show both current position and destination
      if (position) {
        mapRef.current.flyToBounds([position, newPos], {
          padding: [50, 50]
        });
        calculateRoute(position, newPos);
      } else {
        mapRef.current.flyTo(newPos, 13);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const calculateRoute = async (startPos, endPos) => {
    if (!startPos || !endPos) return;
    
    setIsNavigating(true);
    setRouteInfo(null);
    
    try {
      // Clear previous route if exists
      if (routeLayerRef.current) {
        mapRef.current.removeLayer(routeLayerRef.current);
      }
      
      // Use OpenRouteService API for routing
      // Note: Replace with your actual API key
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${map_api}&start=${startPos[1]},${startPos[0]}&end=${endPos[1]},${endPos[0]}`
      );
      
      if (!response.ok) throw new Error('Failed to calculate route');
      
      const data = await response.json();
      
      // Extract route geometry
      const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
      const distance = (data.features[0].properties.segments[0].distance / 1000).toFixed(2); // in km
      const duration = (data.features[0].properties.segments[0].duration / 60).toFixed(1); // in minutes
      
      setRouteInfo({
        distance,
        duration
      });
      
      // Draw the route on the map
      routeLayerRef.current = leaflet.polyline(coordinates, {
        color: '#3b82f6',
        weight: 5,
        opacity: 0.7,
        dashArray: '10, 10'
      }).addTo(mapRef.current);
      
      // Fit bounds to show the entire route
      mapRef.current.flyToBounds(routeLayerRef.current.getBounds(), {
        padding: [50, 50]
      });
      
    } catch (error) {
      console.error('Routing error:', error);
      setSearchError('Failed to calculate route. Please try again.');
    } finally {
      setIsNavigating(false);
    }
  };

  const createCustomIcon = (color = 'red') => {
    const iconString = renderToString(
      <div style={{ color: color, fontSize: '24px' }}>
        <FaMapMarkerAlt />
      </div>
    );
    
    return leaflet.divIcon({
      html: iconString,
      className: 'custom-marker-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-4 right-4 z-[1000] max-w-md mx-auto">
        <form onSubmit={handleSearch} className="flex shadow-lg rounded-full overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination..."
            className="flex-grow p-2 pl-4 focus:outline-none bg-gray-100 text-gray-800 placeholder-gray-500 text-sm"
          />
          <button 
            type="submit" 
            className="bg-gray-300 text-gray-700 p-2 px-4 hover:bg-gray-400 transition-colors flex items-center justify-center"
            disabled={isSearching}
          >
            {isSearching ? (
              <FaSpinner className="text-gray-600 animate-spin" />
            ) : (
              <FaSearch className="text-gray-600" />
            )}
          </button>
        </form>
        {searchError && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded">
            {searchError}
          </div>
        )}
      </div>

      <div id="map" className="h-full w-full" />
      
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
        {position && (
          <>
            <p className="text-sm"><span className="font-semibold">Current:</span> {position[0].toFixed(5)}, {position[1].toFixed(5)}</p>
            {destination && (
              <p className="text-sm"><span className="font-semibold">Destination:</span> {destination[0].toFixed(5)}, {destination[1].toFixed(5)}</p>
            )}
            {routeInfo && (
              <div className="mt-2">
                <p className="text-sm font-semibold">Navigation Info:</p>
                <p className="text-sm">Distance: {routeInfo.distance} km</p>
                <p className="text-sm">Duration: ~{routeInfo.duration} min</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}