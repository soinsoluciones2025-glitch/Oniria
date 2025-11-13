import React from 'react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NAV_ITEMS: { id: Screen; label: string }[] = [
  { id: 'communication', label: 'Comunicación' },
  { id: 'gestures', label: 'Gestos' },
  { id: 'tutor', label: 'Tutor' },
  { id: 'settings', label: 'Ajustes' },
];

const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="app-header">
      <h1 className="app-title">OnirIA</h1>
      <nav className="app-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-button ${currentScreen === item.id ? 'active' : ''}`}
            aria-current={currentScreen === item.id ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
