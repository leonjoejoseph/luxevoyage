import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function GradientButton({ 
  children, 
  className, 
  size = "md",
  ...props 
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-12 py-6 text-xl",
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-gradient-luxury text-navy-deep font-semibold rounded-full transition-all duration-300 hover:shadow-luxury",
        sizeClasses[size],
        className
      )}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      {children}
    </motion.button>
  );
}
