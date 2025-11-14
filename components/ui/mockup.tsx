// components/ui/mockup.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface MockupProps {
  children: ReactNode
  type?: 'desktop' | 'mobile' | 'tablet' | 'responsive'
  className?: string
}

/**
 * Main Mockup component that displays content in a device frame
 */
export function Mockup({
  children,
  type = 'responsive',
  className
}: MockupProps) {
  const typeClasses = {
    desktop: 'aspect-video max-w-5xl',
    mobile: 'aspect-[9/19.5] max-w-sm',
    tablet: 'aspect-[3/4] max-w-2xl',
    responsive: 'aspect-video w-full'
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-background shadow-2xl',
        typeClasses[type],
        className
      )}
    >
      {/* Browser Chrome for desktop/responsive */}
      {(type === 'desktop' || type === 'responsive') && (
        <div className='flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3'>
          <div className='flex gap-2'>
            <div className='h-3 w-3 rounded-full bg-red-500/80' />
            <div className='h-3 w-3 rounded-full bg-yellow-500/80' />
            <div className='h-3 w-3 rounded-full bg-green-500/80' />
          </div>
          <div className='ml-4 flex-1 rounded bg-background/50 px-3 py-1 text-xs text-muted-foreground'>
            https://example.com
          </div>
        </div>
      )}

      {/* Mobile Notch for mobile type */}
      {type === 'mobile' && (
        <div className='absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-background' />
      )}

      {/* Content */}
      <div className='relative h-full w-full overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

interface MockupFrameProps {
  children: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large' | 'full'
}

/**
 * MockupFrame adds perspective and scale effects
 */
export function MockupFrame({
  children,
  className,
  size = 'medium'
}: MockupFrameProps) {
  const sizeClasses = {
    small: 'max-w-3xl',
    medium: 'max-w-5xl',
    large: 'max-w-6xl',
    full: 'max-w-full'
  }

  return (
    <div
      className={cn(
        'relative mx-auto w-full perspective-1000',
        sizeClasses[size],
        className
      )}
      style={{
        transform: 'perspective(1000px) rotateX(2deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glow effect */}
      <div
        className='absolute inset-0 -z-10 opacity-40 blur-3xl'
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)'
        }}
      />

      {children}
    </div>
  )
}

/**
 * MockupGrid for displaying multiple mockups
 */
interface MockupGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function MockupGrid({
  children,
  columns = 3,
  className
}: MockupGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-6 sm:gap-8',
      columnClasses[columns],
      className
    )}>
      {children}
    </div>
  )
}

/**
 * MockupComparison for before/after or side-by-side comparisons
 */
interface MockupComparisonProps {
  before: ReactNode
  after: ReactNode
  className?: string
}

export function MockupComparison({
  before,
  after,
  className
}: MockupComparisonProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      <div className='space-y-3'>
        <p className='text-sm font-medium text-muted-foreground'>Before</p>
        <Mockup type='responsive'>{before}</Mockup>
      </div>
      <div className='space-y-3'>
        <p className='text-sm font-medium text-muted-foreground'>After</p>
        <Mockup type='responsive'>{after}</Mockup>
      </div>
    </div>
  )
}