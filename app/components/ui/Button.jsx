"use client";

export function Button({ 
  children, 
  type = "button",
  isLoading = false,
  disabled = false,
  className = "",
  ...props 
}) {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={`
        py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200 
        ${(isLoading || disabled) ? 'opacity-75 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
} 