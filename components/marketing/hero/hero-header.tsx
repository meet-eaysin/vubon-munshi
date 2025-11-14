

import { Badge } from '@/components/ui/badge'
import { ColourfulText } from '@/components/ui/colourful-text'
import { siteConfig } from '@/config/site'
import { ArrowRightIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useHydrated } from '@/hooks/use-hydrated'

interface HeroHeaderProps {
  title?: string
  description?: string
  badge?: ReactNode | false
}

/**
 * Hydration-safe Badge component
 */
const HydrationSafeBadge = () => {
  const isHydrated = useHydrated()

  return (
    <Badge variant='outline' className='animate-appear'>
      <span className='text-muted-foreground'>
        {isHydrated ? 'hero.badge' : 'Introducing Libra'}
      </span>
      <a href={siteConfig.getStartedUrl} className='flex items-center gap-1'>
        {isHydrated ? 'hero.cta_primary' : 'Get Started'}
        <ArrowRightIcon className='size-3' />
      </a>
    </Badge>
  )
}

/**
 * Hero component header section including title, badge and description
 */
export const HeroHeader = ({ title, description, badge }: HeroHeaderProps) => {
  const isHydrated = useHydrated()

  // Use default values after hydration to avoid mismatch
  const displayTitle = 'hero.title'
  const displayDescription =
    description ||
    (isHydrated
      ? 'hero.subtitle'
      : 'Everything you need to launch your SaaS product quickly. Authentication, payments, database, and more - all pre-configured and ready to go.')
  const displayBadge = badge !== undefined ? badge : <HydrationSafeBadge />
  return (
    <>
      {displayBadge !== false && displayBadge}
      <h1 className='animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl xl:text-8xl md:leading-tight'>
        {displayTitle} &nbsp;
        <ColourfulText text={isHydrated ? 'hero.title_minutes' : 'minutes'} />
      </h1>
      <p className='text-md animate-appear text-muted-foreground relative z-10 max-w-full sm:max-w-[600px] md:max-w-[700px] px-2 sm:px-0 font-medium text-balance opacity-0 delay-100 sm:text-lg md:text-xl'>
        {displayDescription}
      </p>
    </>
  )
}
