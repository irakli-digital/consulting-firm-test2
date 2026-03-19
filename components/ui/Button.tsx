// components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-teal text-white hover:bg-teal-dark focus:ring-teal/50",
  secondary: "bg-navy text-white hover:bg-navy-light focus:ring-navy/50",
  outline: "border-2 border-teal text-teal hover:bg-teal hover:text-white focus:ring-teal/50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
