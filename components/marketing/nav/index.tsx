import { Menu } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo/LogoImage'
import { TextGif } from '@/components/ui/text-gif'
import { Button, ButtonVariants } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavbarComponent, NavbarLeft, NavbarRight } from '@/components/marketing/nav/navbar'
import { Navigation } from '@/components/marketing/nav/navigation'

interface NavbarLink {
  text: string
  href: string
}

interface NavbarActionProps {
  text: string
  href: string
  variant?: ButtonVariants['variant']
  icon?: ReactNode
  iconRight?: ReactNode
  isButton?: boolean
}

interface NavbarProps {
  logo?: ReactNode
  name?: string
  homeUrl?: string
  mobileLinks?: NavbarLink[]
  actions?: NavbarActionProps[]
  showNavigation?: boolean
  customNavigation?: ReactNode
  className?: string
  isAuthenticated?: boolean
}

export default function Navbar({
  name = 'Libra',
  homeUrl = siteConfig.url,
  mobileLinks = [
    { text: "nav.documentation", href: siteConfig.url },
    { text: "nav.templates", href: siteConfig.url },
    { text: "nav.playground", href: siteConfig.url },
  ],
  actions,
  showNavigation = true,
  customNavigation,
  className,
  isAuthenticated = false,
}: NavbarProps) {
  // Generate actions based on authentication status
  const defaultActions: NavbarActionProps[] = isAuthenticated
    ? [
      {
        text: "nav.dashboard",
        href: "/dashboard",
        isButton: true,
        variant: 'default' as const,
      },
    ]
    : [
      { text: "nav.login", href: "/login", isButton: false },
    ]

  const finalActions = actions || defaultActions
  return (
    <header className={cn('sticky top-0 z-50 -mb-4 px-4 pb-4', className)}>
      <div className='fade-bottom bg-[var(--background-landing)]/15 absolute left-0 h-24 w-full backdrop-blur-lg' />
      <div className='max-w-container relative mx-auto'>
        <NavbarComponent>
          <NavbarLeft>
            <div className='flex items-center gap-2'>
              <Link href={homeUrl}>
                <div className='flex items-center gap-1 justify-center rounded-xl'>
                  <Logo />
                  <TextGif
                    text={name}
                    weight="bold"
                  />
                </div>
              </Link>
            </div>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>
          <NavbarRight>
            {finalActions.map((action, index) =>
              action.isButton ? (
                <Button key={index} variant={action.variant || 'default'} asChild>
                  <Link href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </Link>
                </Button>
              ) : (
                <Link key={index} href={action.href} className='hidden text-sm md:block'>
                  {action.text}
                </Link>
              )
            )}
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='shrink-0 md:hidden'>
                  <Menu className='size-5' />
                  <span className='sr-only'>{"nav.toggleNavigation"}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right'>
                <nav className='grid gap-6 text-lg font-medium'>
                  <Link href={homeUrl} className='flex items-center gap-2 text-xl font-bold'>
                    <span>{name}</span>
                  </Link>
                  {mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className='text-muted-foreground hover:text-foreground'
                    >
                      {link.text}
                    </Link>
                  ))}
                  {finalActions.map((action, index) => (
                    <Link
                      key={`mobile-${index}`}
                      href={action.href}
                      className='text-muted-foreground hover:text-foreground'
                    >
                      {action.text}
                    </Link>
                  ))}
                  <div className='pt-4 border-t border-border'>
                    <LanguageSwitcher />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  )
}
