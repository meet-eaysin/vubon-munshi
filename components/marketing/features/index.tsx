

import RisingIllustration from '@/components/marketing/features/components/rising-large'
import { Section } from '@/components/section'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
interface FeatureIllustrationBottomProps {
  title?: string
  description?: string
  visual?: ReactNode
  className?: string
}

export default function Features({
  title = 'features.title',
  description = 'features.subtitle',
  visual = <RisingIllustration />,
  className,
}: FeatureIllustrationBottomProps) {
  return (
    <Section
      className={cn(
        'fade-bottom relative mb-8 sm:mb-12 md:mb-24 lg:mb-32 w-full overflow-hidden pb-0 sm:pb-0 md:pb-0',
        className
      )}
    >
      <div className='relative'>
        <div className='max-w-container mx-auto flex flex-col gap-6 sm:gap-12 md:gap-16 lg:gap-24 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center gap-4 text-center sm:gap-6 md:gap-8 lg:gap-12'>
            <h1 className='from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block max-w-full sm:max-w-[720px] md:max-w-[920px] bg-linear-to-r bg-clip-text text-2xl font-semibold text-balance text-transparent drop-shadow-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl sm:leading-tight md:leading-tight'>
              {title}
            </h1>
            <p className='text-base text-muted-foreground relative z-10 max-w-full sm:max-w-[520px] md:max-w-[620px] font-medium text-balance sm:text-lg md:text-xl'>
              {description}
            </p>
          </div>
          <div className='w-full'>{visual}</div>
        </div>
      </div>
    </Section>
  )
}
