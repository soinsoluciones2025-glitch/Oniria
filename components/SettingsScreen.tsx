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
          <p>Perfecto para personas con dificultades auditivas. Escucha las conversaciones a tu alrededor y las muestra como texto en la pantalla para que no te pierdas de nada.</p>
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
