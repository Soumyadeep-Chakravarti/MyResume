import React, { Suspense, useRef } from "react";
import CameraContainer from "./CameraContainer.jsx";
// Lazy load scenes
const SceneGate = React.lazy(() => import("./Scenes/SceneGate.jsx"));
const SceneArchive = React.lazy(() => import("./Scenes/SceneArchive.jsx"));
const SceneObelisks = React.lazy(() => import("./Scenes/SceneObelisks.jsx"));
const ScenePlaza = React.lazy(() => import("./Scenes/ScenePlaza.jsx"));
const SceneBeacon = React.lazy(() => import("./Scenes/SceneBeacon.jsx"));

const CinematicResume = () => {
  const containerRef = useRef(null);

  return (
    <CameraContainer>
      <div 
        ref={containerRef}
        className="relative w-full" 
        style={{ height: '500vh' }}
        data-scroll-container
      >
        {/* Each scene takes up a viewport height with some overlap */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-white">Loading scene...</div>}>
          {/* Scene 1: Hero - The Gate */}
          <SceneGate />
          
          {/* Scene 2: About - The Archive */}
          <SceneArchive />
          
          {/* Scene 3: Skills - The Obelisks */}
          <SceneObelisks />
          
          {/* Scene 4: Projects - The Plaza */}
          <ScenePlaza />
          
          {/* Scene 5: Contact - The Beacon */}
          <SceneBeacon />
        </Suspense>
      </div>
    </CameraContainer>
  );
};

export default CinematicResume;
