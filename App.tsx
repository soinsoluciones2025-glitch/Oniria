import React, { useState } from 'react';
import CommunicationScreen from './components/CommunicationScreen';
import GestureScreen from './components/GestureScreen';
import SettingsScreen from './components/SettingsScreen';
import TutorScreen from './components/TutorScreen';
import Header from './components/Header';
import { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('communication');
  const [isHearingModeEnabled, setIsHearingModeEnabled] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'communication':
        return <CommunicationScreen isHearingModeEnabled={isHearingModeEnabled} />;
      case 'gestures':
        return <GestureScreen />;
      case 'tutor':
        return <TutorScreen />;
      case 'settings':
        return (
          <SettingsScreen
            isHearingModeEnabled={isHearingModeEnabled}
            onHearingModeToggle={setIsHearingModeEnabled}
          />
        );
      default:
        return <CommunicationScreen isHearingModeEnabled={isHearingModeEnabled} />;
    }
  };

  return (
    <div className="app-container">
      <Header currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <main className="screen-content">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
