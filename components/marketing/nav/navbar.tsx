import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface NavbarComponentProps {
  children: ReactNode
  className?: string
}

export function NavbarComponent({ children, className }: NavbarComponentProps) {
  return (
    <nav
      className={cn(
        'relative flex h-16 items-center justify-between rounded-2xl border border-border/40 bg-background/95 px-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      {children}
    </nav>
  )
}

interface NavbarLeftProps {
  children: ReactNode
  className?: string
}

export function NavbarLeft({ children, className }: NavbarLeftProps) {
  return (
    <div className={cn('flex items-center gap-6', className)}>
      {children}
    </div>
  )
}

interface NavbarRightProps {
  children: ReactNode
  className?: string
}

export function NavbarRight({ children, className }: NavbarRightProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children}
    </div>
  )
}
