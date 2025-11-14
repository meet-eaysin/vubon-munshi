import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BeamProps {
  children: ReactNode
  className?: string
  tone?: 'brand' | 'brandLight' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

/**
 * Beam component - Creates a glowing animated background effect
 */
export function Beam({
  children,
  className,
  tone = 'brand',
  size = 'md',
  animated = true
}: BeamProps) {
  const toneClasses = {
    brand: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
    brandLight: 'from-violet-400/30 via-purple-400/30 to-fuchsia-400/30',
    primary: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    secondary: 'from-gray-500/20 via-slate-500/20 to-zinc-500/20',
    accent: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
    success: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    warning: 'from-yellow-500/20 via-orange-500/20 to-amber-500/20',
    danger: 'from-red-500/20 via-orange-500/20 to-pink-500/20'
  }

  const sizeClasses = {
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-48 w-48',
    xl: 'h-64 w-64'
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Animated gradient beam */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br blur-3xl',
          toneClasses[tone],
          sizeClasses[size],
          animated && 'animate-beam-pulse'
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
