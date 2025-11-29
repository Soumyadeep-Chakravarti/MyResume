// App.jsx (Refined Implementation)

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
// useCinematic removed as it's only used in MainContent now
import { CinematicProvider } from './context/CinematicModeContext.jsx';
import { CursorProvider } from './context/CursorContext.jsx';

import CursorBall from './components/DynamicBackground/CursorBall.jsx';
import { MainContent } from './MainContent.jsx'; // Assuming MainContent is in a separate file

// NOTE: If you haven't moved MainContent to its own file, paste its code here, 
// and remove the import/export.

export default function App() {
	return (
		<BrowserRouter> {/* <--- WRAP THE ENTIRE APP IN THE ROUTER */}
			<ThemeProvider>
				<LenisProvider>
					<CinematicProvider>
						<CursorProvider>
							<CursorBall />
							<MainContent />
						</CursorProvider>
					</CinematicProvider>
				</LenisProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
