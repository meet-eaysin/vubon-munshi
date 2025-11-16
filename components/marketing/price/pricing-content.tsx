
'use client'

import { useState } from 'react'
import { EnterpriseHorizontal, PricingColumn } from './pricing-column'
import { Switch } from '@/components/ui/switch'
import { Plan } from '@/components/marketing/price/types'
import { createEnterprisePlan } from '@/components/marketing/price/plan-utils'
import { FireExtinguisher } from 'lucide-react'

interface PricingContentProps {
  title?: string
  description?: string
  yearlyDiscount: number
  propPlans?: Plan[]
  showEnterprise: boolean
}


const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for individuals exploring basic tools.',
    icon: <FireExtinguisher className="size-5" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    seats: 1,
    variant: 'default',
    isEnterprise: false,
    isCurrentPlan: false,
    cta: { variant: 'default', label: 'Get Started', href: '#' },
    features: [
      'Basic dashboard access',
      '1 user seat',
      'Community support'
    ],
    marketingFeatures: [
      'Email support',
      'Access to documentation'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced tools for professionals and small teams.',
    icon: <FireExtinguisher className="size-5" />,
    monthlyPrice: 29,
    yearlyPrice: 290, // discounted yearly
    seats: 5,
    variant: 'glow',
    isEnterprise: false,
    isCurrentPlan: false,
    cta: { variant: 'glow', label: 'Upgrade Now', href: '#' },
    features: [
      'Everything in Free',
      'Advanced analytics',
      'Priority email support'
    ],
    marketingFeatures: [
      'Custom integrations',
      'API access',
      'Team activity logs'
    ]
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Collaboration tools for growing teams and organizations.',
    icon: <FireExtinguisher className="size-5" />,
    monthlyPrice: 99,
    yearlyPrice: 990,
    seats: 20,
    variant: 'default',
    isEnterprise: false,
    isCurrentPlan: false,
    cta: { variant: 'default', label: 'Choose Team', href: '#' },
    features: [
      'Everything in Pro',
      'Team collaboration tools',
      'Admin dashboard'
    ],
    marketingFeatures: [
      'SSO support',
      'Audit logs',
      '24/7 priority support'
    ]
  }
]
export function PricingContent({ title, description, yearlyDiscount, propPlans, showEnterprise }: PricingContentProps) {
  const [isYearly, setIsYearly] = useState(false)

  const plans = mockPlans || []

  const enterprisePlan = { ...createEnterprisePlan(), cta: { ...createEnterprisePlan().cta, href: '#' } }

  return (
    <>
      {(title || description) && (
        <div className='flex flex-col items-center gap-4 text-center sm:gap-6 md:gap-8'>
          {title && (
            <h2 className='text-2xl leading-tight font-semibold text-balance sm:text-3xl md:text-4xl lg:text-5xl sm:leading-tight'>
              {title}
            </h2>
          )}
          {description && (
            <p className='text-base text-muted-foreground max-w-full sm:max-w-[720px] md:max-w-[920px] font-medium text-balance sm:text-lg md:text-xl'>
              {description}
            </p>
          )}
        </div>
      )}

      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4'>
          <span className='text-sm'>Monthly</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className='data-[state=checked]:bg-brand'
          />
          <span className='text-sm'>
            Yearly
            <span className='bg-brand/10 text-brand ml-1.5 rounded-full px-2 py-0.5 text-xs'>
              Save up to {yearlyDiscount}%
            </span>
          </span>
        </div>
      </div>

      {(
        <>
          <div className='max-w-container mx-auto grid w-full grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {plans
              .filter((plan) => !plan.isEnterprise)
              .map((plan) => (
                <PricingColumn
                  key={plan.id}
                  name={plan.name}
                  icon={plan.icon}
                  description={plan.description}
                  price={isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  isYearly={isYearly}
                  monthlyPrice={plan.monthlyPrice}
                  yearlyPrice={plan.yearlyPrice}
                  cta={plan.cta}
                  features={plan.features}
                  marketingFeatures={plan.marketingFeatures}
                  variant={plan.variant}
                  isCurrentPlan={plan.isCurrentPlan}
                />
              ))}
          </div>

          {showEnterprise && (
            <div className='w-full mt-8 sm:mt-10 md:mt-12'>
              <EnterpriseHorizontal
                name={enterprisePlan.name}
                icon={enterprisePlan.icon}
                description={enterprisePlan.description}
                cta={enterprisePlan.cta}
                features={enterprisePlan.features}
                marketingFeatures={enterprisePlan.marketingFeatures}
                variant='enterprise'
              />
            </div>
          )}
        </>
      )}
    </>
  )
}