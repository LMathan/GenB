import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span 
      className={cn("typography-label text-brand-accent tracking-widest block mb-4", className)} 
      {...props}
    >
      {children}
    </span>
  );
}

export function SectionHeading({ className, children, as: Component = "h2", ...props }: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
  const styles = {
    h1: "typography-h1",
    h2: "typography-h2",
    h3: "typography-h3",
    h4: "text-xl font-bold tracking-tight",
    h5: "text-lg font-bold tracking-tight",
    h6: "text-base font-bold tracking-tight",
  };
  
  return (
    <Component 
      className={cn("text-brand-primary mb-6", styles[Component], className)} 
      {...props}
    >
      {children}
    </Component>
  );
}

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export function Section({ className, children, theme = "light", ...props }: React.HTMLAttributes<HTMLElement> & { theme?: "light" | "alt" | "dark" }) {
  const themes = {
    light: "bg-brand-bg text-brand-primary",
    alt: "bg-brand-surface text-brand-primary",
    dark: "bg-brand-primary text-brand-surface",
  };

  return (
    <section 
      className={cn("py-16 md:py-24", themes[theme], className)} 
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ className, children, size = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: "default" | "narrow" | "wide" }) {
  const sizes = {
    default: "max-w-7xl",
    narrow: "max-w-3xl",
    wide: "max-w-[1600px]",
  };

  return (
    <div 
      className={cn("mx-auto px-6 md:px-12 w-full", sizes[size], className)} 
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SURFACE COMPONENTS
// ============================================================================

export function Surface({ className, children, variant = "base", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "base" | "elevated" | "dark" | "transparent" }) {
  const variants = {
    base: "surface-base",
    elevated: "surface-elevated",
    dark: "surface-dark",
    transparent: "bg-transparent",
  };

  return (
    <div 
      className={cn(variants[variant], className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export function Divider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-t border-border my-8", className)} {...props} />;
}

// ============================================================================
// INTERACTIVE COMPONENTS
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    // Basic implementation that avoids complex dependencies like class-variance-authority for now
    // to keep it simple and easy to maintain as requested by the prompt.
    const variants = {
      primary: "bg-brand-primary text-brand-surface hover:bg-brand-secondary shadow-subtle",
      secondary: "bg-brand-success text-brand-surface hover:bg-brand-success-hover shadow-subtle",
      tertiary: "bg-brand-accent text-brand-surface hover:bg-brand-accent-hover shadow-subtle",
      outline: "border border-border bg-transparent hover:bg-brand-surface-alt text-brand-primary",
      ghost: "bg-transparent hover:bg-brand-surface-alt text-brand-primary",
    };
    
    const sizes = {
      default: "h-12 px-6 py-2 typography-small uppercase tracking-wide",
      sm: "h-9 px-4 py-1 typography-label",
      lg: "h-14 px-8 py-3 typography-small uppercase tracking-wide",
      icon: "h-12 w-12",
    };

    const baseStyles = "inline-flex items-center justify-center rounded-md font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export function Badge({ className, children, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "success" | "warning" | "accent" }) {
  const variants = {
    default: "bg-brand-surface-alt text-brand-secondary border border-border",
    success: "bg-brand-success/10 text-brand-success border border-brand-success/20",
    warning: "bg-brand-warning/10 text-brand-warning border border-brand-warning/20",
    accent: "bg-brand-accent/10 text-brand-accent border border-brand-accent/20",
  };

  return (
    <div 
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider", variants[variant], className)} 
      {...props}
    >
      {children}
    </div>
  );
}
