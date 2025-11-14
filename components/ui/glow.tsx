import { cn } from "@/lib/utils"

interface GlowProps {
  className?: string
  variant?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  color?: 'brand' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  intensity?: 'low' | 'medium' | 'high'
  animated?: boolean
}

/**
 * Glow component - Creates a positioned glow effect
 */
export default function Glow({
  className,
  variant = 'center',
  color = 'brand',
  size = 'lg',
  intensity = 'medium',
  animated = false
}: GlowProps) {
  const positionClasses = {
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    top: 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
    bottom: 'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
    left: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
    'top-left': 'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'right-0 top-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'right-0 bottom-0 translate-x-1/2 translate-y-1/2'
  }

  const colorClasses = {
    brand: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
    primary: 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500',
    secondary: 'bg-gradient-to-br from-gray-500 via-slate-500 to-zinc-500',
    accent: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-500',
    success: 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500',
    warning: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500',
    danger: 'bg-gradient-to-br from-red-500 via-orange-500 to-pink-500'
  }

  const sizeClasses = {
    sm: 'h-32 w-32',
    md: 'h-48 w-48',
    lg: 'h-64 w-64',
    xl: 'h-96 w-96',
    full: 'h-full w-full'
  }

  const intensityClasses = {
    low: 'opacity-20',
    medium: 'opacity-30',
    high: 'opacity-50'
  }

  return (
    <div
      className={cn(
        'pointer-events-none absolute rounded-full blur-3xl',
        positionClasses[variant],
        colorClasses[color],
        sizeClasses[size],
        intensityClasses[intensity],
        animated && 'animate-glow-pulse',
        className
      )}
      aria-hidden="true"
    />
  )
}