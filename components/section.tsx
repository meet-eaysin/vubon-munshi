// components/ui/section.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  containerClassName?: string
}

/**
 * Reusable Section component for landing page sections
 * Provides consistent spacing and layout across all sections
 */
export function Section({
  children,
  className,
  id,
  containerClassName
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-12 sm:py-16 md:py-20 lg:py-24',
        className
      )}
    >
      {children}
    </section>
  )
}

/**
 * Section with centered container and max-width
 */
export function SectionContainer({
  children,
  className,
  id
}: SectionProps) {
  return (
    <Section id={id} className={className}>
      <div className='max-w-container mx-auto px-4 sm:px-6 lg:px-8'>
        {children}
      </div>
    </Section>
  )
}

/**
 * Section header component for consistent section titles
 */
interface SectionHeaderProps {
  title: string
  description?: string
  badge?: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function SectionHeader({
  title,
  description,
  badge,
  className,
  align = 'center'
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  }

  return (
    <div className={cn(
      'flex flex-col gap-3 sm:gap-4',
      alignmentClasses[align],
      className
    )}>
      {badge && <div className='mb-2'>{badge}</div>}
      <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'>
        {title}
      </h2>
      {description && (
        <p className='text-lg text-muted-foreground sm:text-xl max-w-2xl'>
          {description}
        </p>
      )}
    </div>
  )
}