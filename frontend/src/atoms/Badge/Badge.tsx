import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-purple-100 text-purple-800',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

