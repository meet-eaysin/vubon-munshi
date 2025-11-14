'use client'

import { Mockup, MockupFrame } from '@/components/ui/mockup'
import type { ReactNode } from 'react'
import { memo } from 'react'

const defaultMockup = (
  <div className='p-6 text-center text-muted-foreground'>
    Default mockup content
  </div>
)

interface HeroMockupProps {
  mockup?: ReactNode | false
}

const HeroMockupComponent = ({ mockup = defaultMockup }: HeroMockupProps) => {
  if (mockup === false) return null

  return (
    <div className='relative w-full pt-8 sm:pt-10 md:pt-12'>
      <MockupFrame className='animate-appear opacity-0 delay-700' size='small'>
        <Mockup
          type='responsive'
          className='bg-[var(--background-landing)]/90 w-full rounded-xl border-0'
        >
          {mockup}
        </Mockup>
      </MockupFrame>
    </div>
  )
}

HeroMockupComponent.displayName = 'HeroMockup'

export const HeroMockup = memo(HeroMockupComponent)
