import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function GlassmorphismCard({ 
  children, 
  className, 
  dark = false 
}: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl p-6",
        dark ? "glassmorphism-dark" : "glassmorphism",
        className
      )}
    >
      {children}
    </div>
  );
}
