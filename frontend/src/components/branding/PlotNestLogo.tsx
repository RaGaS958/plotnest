import React from 'react';

import logoLarge from '../../assets/branding/plotnest-logo-large.png';
import logoHorizontal from '../../assets/branding/plotnest-logo.png';
import logoIcon from '../../assets/branding/plotnest-icon.png';
import appIcon from '../../assets/branding/plotnest-app-icon.png';

export interface PlotNestLogoProps {
  variant?: 'horizontal' | 'icon' | 'large' | 'app-icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PlotNestLogo: React.FC<PlotNestLogoProps> = ({ 
  variant = 'horizontal', 
  size = 'md',
  className = ''
}) => {
  let src = logoHorizontal;
  if (variant === 'icon') src = logoIcon;
  else if (variant === 'large') src = logoLarge;
  else if (variant === 'app-icon') src = appIcon;

  // Responsive sizing logic based on design guidelines
  // Desktop 28-36px, Tablet 26-32px, Mobile 24-30px for horizontal
  
  let sizeClasses = '';
  if (variant === 'horizontal' || variant === 'large') {
    if (size === 'sm') sizeClasses = 'h-5 md:h-6';
    else if (size === 'md') sizeClasses = 'h-6 md:h-8';
    else if (size === 'lg') sizeClasses = 'h-8 md:h-10';
    else if (size === 'xl') sizeClasses = 'h-10 md:h-14';
  } else {
    // Icon variants
    if (size === 'sm') sizeClasses = 'h-6 w-6';
    else if (size === 'md') sizeClasses = 'h-8 w-8';
    else if (size === 'lg') sizeClasses = 'h-10 w-10 md:h-12 md:w-12';
    else if (size === 'xl') sizeClasses = 'h-16 w-16 md:h-20 md:w-20';
  }

  return (
    <img 
      src={src} 
      alt="PlotNest" 
      className={`block object-contain ${sizeClasses} ${className}`}
      style={{ width: 'auto', maxWidth: '100%' }}
    />
  );
};
