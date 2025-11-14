

import type { ReactNode } from 'react'
import { TextGif } from '../../ui/text-gif'
import { Logo } from '@/components/logo/LogoImage'
import { siteConfig } from '@/config/site'
import { Footer, FooterBottom, FooterColumn, FooterContent } from '@/components/ui/footer'
import { cn } from '@/lib/utils'

interface FooterLink {
  text: string
  href: string
  id: string
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
  id: string
}

interface FooterProps {
  logo?: ReactNode
  name?: string
  columns?: FooterColumnProps[]
  copyright?: string
  policies?: FooterLink[]
  className?: string
}

export default function FooterSection({
  logo = <Logo />,
  name = 'Libra AI',
  columns = [
    {
      id: 'product',
      title: 'footer.product',
      links: [
        { id: 'changelog', text: 'footer.changelog', href: siteConfig.url },
        { id: 'documentation', text: 'footer.documentation', href: siteConfig.url },
      ],
    },
    {
      id: 'contact',
      title: 'footer.contact',
      links: [
        { id: 'forum', text: 'footer.community', href: siteConfig.links.forum },
        { id: 'twitter', text: 'footer.twitter', href: siteConfig.links.twitter },
        { id: 'github', text: 'footer.github', href: siteConfig.links.github },
      ],
    },
  ],
  copyright = 'footer.copyright_nextify',
  policies = [
    { id: 'privacy', text: 'footer.privacy', href: '/privacy' },
    { id: 'terms', text: 'footer.terms', href: '/terms' },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn('w-full px-4 sm:px-6 lg:px-8', className)}>
      <div className='max-w-container mx-auto'>
        <Footer>
          <FooterContent>
            <FooterColumn className='col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-1'>
              <div className='flex items-center gap-1'>
                {logo}
                <h3 className='text-lg sm:text-xl font-bold'>
                  <TextGif text={name} weight='bold' />
                </h3>
              </div>
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.id}>
                <h3 className='text-sm sm:text-md pt-1 font-semibold'>{column.title}</h3>
                {column.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className='text-muted-foreground text-sm'
                    data-attr={link.id === 'github' || link.href?.includes('github.com') ? 'github' : undefined}
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
              {policies.map((policy) => (
                <a key={policy.id} href={policy.href}>
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  )
}
