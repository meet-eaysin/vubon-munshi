

'use client'

import { siteConfig } from '@/config/site'
import { Button } from '../../ui/button'
import type { HeroButtonProps } from './types'
import { FormInput, GithubIcon } from 'lucide-react'

interface HeroButtonsGroupProps {
  buttons?: HeroButtonProps[] | false
}

/**
 * Default button configuration
 */
const getDefaultButtons = (): HeroButtonProps[] => [
  {
    href: siteConfig.links.forum,
    text: 'hero.examples.buttons.forum',
    variant: 'default',
    icon: <FormInput className='mr-2 size-4' />,
  },
  {
    href: siteConfig.links.github,
    text: 'hero.examples.buttons.github',
    variant: 'secondary',
    icon: <GithubIcon className='mr-2 size-4' />,
  },
]

/**
 * Bottom button area of Hero component
 */
export const HeroButtons = ({ buttons = getDefaultButtons() }: HeroButtonsGroupProps) => {
  // Removed log: console.log('HeroButtons rendering')

  if (buttons === false || buttons.length === 0) {
    return null
  }

  return (
    <div className='animate-appear relative flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 opacity-0 delay-400 z-[5] w-full px-4 sm:px-0'>
      {buttons.map((button, index) => (
        <Button key={`${button.text}-${button.href}-${index}`} variant={button.variant || 'default'} size='lg' asChild className='w-full sm:w-auto'>
          <a
            href={button.href}
            className='relative'
            data-attr={button.href?.includes('github.com') ? 'github' : undefined}
          >
            {button.icon}
            {button.text}
            {button.iconRight}
          </a>
        </Button>
      ))}
    </div>
  )
}
