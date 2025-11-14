

import type { PricingProps } from './types'
import { PricingContent } from './components/pricing-content'
import { cn } from '@/lib/utils'
import { Section } from '@/components/section'

export default function Pricing({
  yearlyDiscount = 20,
  plans: propPlans,
  className,
  showEnterprise = true,
  title = 'pricing.title_default',
  description = 'pricing.description_default',
}: PricingProps) {
  return (
    <Section className={cn(className)} id="price">
      <div className='mx-auto flex max-w-6xl flex-col items-center gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 lg:px-8'>
        <PricingContent
          title={title}
          description={description}
          yearlyDiscount={yearlyDiscount}
          propPlans={propPlans}
          showEnterprise={showEnterprise}
        />
      </div>
    </Section>
  )
}
