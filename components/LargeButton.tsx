import React from 'react';

interface LargeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ai' | 'speak' | 'clear';
}

const LargeButton: React.FC<LargeButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`large-button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default LargeButton;
