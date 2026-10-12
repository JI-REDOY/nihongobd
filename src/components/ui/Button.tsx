import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-jp-red text-white hover:bg-jp-red/90 active:bg-jp-red/80 shadow-sm",
  secondary:
    "bg-bd-green text-white hover:bg-bd-green/90 active:bg-bd-green/80 shadow-sm",
  outline:
    "border border-border bg-white text-text-primary hover:bg-bg-alt active:bg-bg-alt/80",
  ghost:
    "bg-transparent text-text-primary hover:bg-bg-alt active:bg-bg-alt/80",
  danger:
    "bg-error text-white hover:bg-error/90 active:bg-error/80 shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2.5 text-base rounded-xl",
  lg: "px-6 py-3 text-lg rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "min-h-[44px]", // touch-friendly
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            লোড হচ্ছে...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";