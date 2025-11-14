// components/ui/tile.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TileProps {
  children: ReactNode
  className?: string
}

/**
 * Main Tile component for bento grid layouts
 */
export function Tile({ children, className }: TileProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 sm:p-8 transition-all duration-300 hover:border-border hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * TileLink - Invisible link overlay for the entire tile
 */
interface TileLinkProps {
  href?: string
  className?: string
}

export function TileLink({ href, className }: TileLinkProps) {
  if (!href) {
    return null
  }

  return (
    <a
      href={href}
      className={cn(
        'absolute inset-0 z-10',
        className
      )}
      aria-label="View details"
    >
      <span className="sr-only">View details</span>
    </a>
  )
}

/**
 * TileContent - Container for text content
 */
interface TileContentProps {
  children: ReactNode
  className?: string
}

export function TileContent({ children, className }: TileContentProps) {
  return (
    <div className={cn('relative z-10 flex flex-col gap-3 sm:gap-4', className)}>
      {children}
    </div>
  )
}

/**
 * TileTitle - Title text for the tile
 */
interface TileTitleProps {
  children: ReactNode
  className?: string
}

export function TileTitle({ children, className }: TileTitleProps) {
  return (
    <h3
      className={cn(
        'text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl',
        className
      )}
    >
      {children}
    </h3>
  )
}

/**
 * TileDescription - Description text for the tile
 */
interface TileDescriptionProps {
  children: ReactNode
  className?: string
}

export function TileDescription({ children, className }: TileDescriptionProps) {
  return (
    <div
      className={cn(
        'text-sm text-muted-foreground sm:text-base space-y-2',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * TileVisual - Container for visual content (illustrations, images, etc.)
 */
interface TileVisualProps {
  children: ReactNode
  className?: string
}

export function TileVisual({ children, className }: TileVisualProps) {
  return (
    <div
      className={cn(
        'relative mt-6 flex w-full items-center justify-center overflow-hidden sm:mt-8',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * TileIcon - Icon container for tiles
 */
interface TileIconProps {
  children: ReactNode
  className?: string
}

export function TileIcon({ children, className }: TileIconProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * TileBadge - Small badge/tag for tiles
 */
interface TileBadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function TileBadge({
  children,
  className,
  variant = 'default'
}: TileBadgeProps) {
  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500/10 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

/**
 * TileGrid - Wrapper for creating bento grid layouts
 */
interface TileGridProps {
  children: ReactNode
  className?: string
  columns?: 12
}

export function TileGrid({
  children,
  className,
  columns = 12
}: TileGridProps) {
  return (
    <div
      className={cn(
        'grid gap-3 sm:gap-4 w-full',
        `grid-cols-${columns}`,
        className
      )}
    >
      {children}
    </div>
  )
}