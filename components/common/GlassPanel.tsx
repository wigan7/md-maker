'use client';

import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'floating';
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({
  variant = 'primary',
  children,
  className = '',
  ...props
}: GlassPanelProps) {
  const variantClass = {
    primary: 'glass-primary rounded-ios-xl',
    secondary: 'glass-secondary rounded-ios-lg',
    floating: 'glass-floating rounded-ios-2xl',
  }[variant];

  return (
    <div className={`${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

