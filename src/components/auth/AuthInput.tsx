import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1.5 font-bangla"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-white",
            "text-text-primary placeholder:text-text-secondary/60",
            "focus:outline-none focus:ring-2 focus:ring-jp-red/20 focus:border-jp-red",
            "transition-all duration-200",
            "min-h-[44px]",
            error ? "border-error" : "border-border",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error font-bangla">{error}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";