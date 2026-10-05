'use client';

import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function GlassButton({
  variant = 'secondary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  ...props
}: GlassButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-ios-sm gap-1.5',
    md: 'px-4 py-2 text-sm rounded-ios-md gap-2',
    lg: 'px-6 py-3 text-base rounded-ios-lg gap-2.5 font-medium',
  }[size];

  const variantClasses = {
    primary:
      'bg-blue-600/90 hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/30 active:scale-[0.98]',
    secondary:
      'glass-secondary hover:bg-white/40 dark:hover:bg-white/10 text-gray-800 dark:text-gray-100 border border-white/20 active:scale-[0.98]',
    ghost:
      'hover:bg-black/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 active:scale-[0.98]',
    danger:
      'bg-red-500/15 hover:bg-red-500/25 text-red-600 dark:text-red-400 border border-red-500/20 active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.01] ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

