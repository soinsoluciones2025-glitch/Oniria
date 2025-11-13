import React from 'react';

interface SettingsScreenProps {
  isHearingModeEnabled: boolean;
  onHearingModeToggle: (isEnabled: boolean) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ isHearingModeEnabled, onHearingModeToggle }) => {
  return (
    <div className="settings-container">
      <h2>Configuración</h2>
      <div className="setting-item">
        <div className="setting-text">
          <h3>Modo de Accesibilidad Auditiva</h3>
          <p>Traduce la voz del entorno a texto en tiempo real. Requiere permiso para usar el micrófono.</p>
        </div>
        <div className="setting-control">
           <label className="switch">
            <input
              type="checkbox"
              checked={isHearingModeEnabled}
              onChange={(e) => onHearingModeToggle(e.target.checked)}
              aria-describedby="hearing-mode-description"
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
       <div className="setting-item">
        <div className="setting-text">
          <h3>Voz y Velocidad</h3>
          <p>Próximamente podrás elegir diferentes voces y ajustar la velocidad del habla.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
