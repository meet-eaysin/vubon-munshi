'use client'

import { useState } from 'react'
import type { Plan } from './types'
import { createEnterprisePlan } from './utils/plan-utils'
import { EnterpriseHorizontal, PricingColumn } from './components/pricing-column'
import { Switch } from '@/components/ui/switch'

const dummyPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with basic features.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    seats: 1,
    cta: { variant: 'default', label: 'Get Started', href: '#' },
    features: ['Basic features', '1 user', 'Community support'],
    marketingFeatures: ['Email support', 'Documentation access'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced features for professionals and teams.',
    monthlyPrice: 29,
    yearlyPrice: 290,
    seats: 5,
    cta: { variant: 'glow', label: 'Upgrade Now', href: '#' },
    features: ['All free features', 'Advanced tools', 'Priority support'],
    marketingFeatures: ['Custom integrations', 'API access', 'Advanced analytics'],
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Collaborative tools for growing teams.',
    monthlyPrice: 99,
    yearlyPrice: 990,
    seats: 20,
    cta: { variant: 'default', label: 'Choose Team', href: '#' },
    features: ['All pro features', 'Team collaboration', 'Admin dashboard'],
    marketingFeatures: ['SSO integration', 'Audit logs', '24/7 support'],
  },
]

interface PricingDemoProps {
  title?: string
  description?: string
  yearlyDiscount?: number
  showEnterprise?: boolean
}

export function PricingDemo({
  title = 'Choose Your Plan',
  description = 'Select the perfect plan for your needs',
  yearlyDiscount = 20,
  showEnterprise = true
}: PricingDemoProps) {
  const [isYearly, setIsYearly] = useState(false)

  const plans = dummyPlans
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
  )
}