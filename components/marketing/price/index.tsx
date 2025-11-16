
import { cn } from '@/lib/utils'
import { PricingContent } from '@/components/marketing/price/pricing-content'
import { PricingProps } from '@/components/marketing/price/types'
import { FireExtinguisher } from 'lucide-react'


export default function Pricing({
  yearlyDiscount = 20,
  plans: propPlans,
  className,
  showEnterprise = true,
  title = 'pricing.title_default',
  description = 'pricing.description_default',
}: PricingProps) {
  return (
    <div className={cn(className)} id="price">
      <div className='mx-auto flex max-w-6xl flex-col items-center gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 lg:px-8'>
        <PricingContent
          title={title}
          description={description}
          yearlyDiscount={yearlyDiscount}
          propPlans={propPlans}
          showEnterprise={showEnterprise}
        />
      </div>
    </div>
  )
}