import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavigationLink {
  text: string
  href: string
}

interface NavigationProps {
  links?: NavigationLink[]
  className?: string
}

export function Navigation({
  links = [
    { text: 'Documentation', href: '/docs' },
    { text: 'Templates', href: '/templates' },
    { text: 'Playground', href: '/playground' },
  ],
  className
}: NavigationProps) {
  return (
    <nav className={cn('hidden md:flex md:items-center md:gap-6', className)}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          {link.text}
        </Link>
      ))}
    </nav>
  )
}
