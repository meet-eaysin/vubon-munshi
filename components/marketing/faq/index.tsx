

import { Section } from '@/components/section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { ReactNode } from 'react'

interface FAQItemProps {
  question: string
  answer: ReactNode
  value?: string
}

interface FAQProps {
  title?: string
  items?: FAQItemProps[] | false
  className?: string
}

export default function FAQ({
  title = 'faq.title',
  items = [
    {
      question: 'faq.q1',
      answer: (
        <>
          <p className='text-muted-foreground mb-4 max-w-[640px] text-balance'>{'faq.a1'}</p>
        </>
      ),
    },
    {
      question: 'faq.q2',
      answer: (
        <>
          <p className='text-muted-foreground mb-4 max-w-[600px]'>{'faq.a2'}</p>
        </>
      ),
    },
    {
      question: 'faq.q3',
      answer: (
        <>
          <p className='text-muted-foreground mb-4 max-w-[580px]'>{'faq.a3'}</p>
        </>
      ),
    },
    {
      question: 'faq.q4',
      answer: <p className='text-muted-foreground mb-4 max-w-[580px]'>{'faq.a4'}</p>,
    },
    {
      question: 'faq.q5',
      answer: <p className='text-muted-foreground mb-4 max-w-[580px]'>{'faq.a5'}</p>,
    },
    {
      question: 'faq.q6',
      answer: <p className='text-muted-foreground mb-4 max-w-[580px]'>{'faq.a6'}</p>,
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section className={className}>
      <div className='max-w-container mx-auto flex flex-col items-center gap-8 md:flex-row md:items-start'>
        <h2 className='text-center text-3xl leading-tight font-semibold sm:text-5xl md:text-left md:leading-tight'>
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type='single' collapsible className='w-full max-w-[800px]'>
            {items.map((item, index) => (
              <AccordionItem key={index} value={item.value || `item-${index + 1}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  )
}
