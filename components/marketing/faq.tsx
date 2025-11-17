import { Section } from '@/components/section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQ({ title = 'Frequently Asked Questions' }) {
  return (
    <Section>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 md:flex-row md:items-start">
        <h2 className="text-center text-3xl leading-tight font-semibold sm:text-5xl md:text-left md:leading-tight">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-[800px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>How are Shakil Sir&apos;s courses different from regular math tuition?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                Our courses are specifically designed with practical, exam-focused content that makes complex mathematical concepts accessible. Each lesson includes animated explanations, real-world examples, and interactive quizzes that help students not just memorize but truly understand mathematics.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I access the courses on mobile devices?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[600px]">
                Yes! Our platform is fully responsive and works perfectly on smartphones and tablets. You can study from anywhere - during your commute, breaks, or while revising at home. The video player adapts to different screen sizes for optimal viewing.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What if I get stuck on a particular math problem?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                We provide multiple support channels: detailed video explanations for each concept, practice quizzes with step-by-step solutions, and community forums where you can ask questions. Our support team typically responds within 24 hours.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Do you offer HSC Mathematics preparation?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                Absolutely! We have comprehensive HSC Mathematics preparation courses that cover the entire syllabus, including calculus, geometry, statistics, and algebra. Our courses include model test papers and exam strategies specifically tailored for HSC examination patterns.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Are study notes and practice papers included?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                Yes! Most courses include downloadable PDF notes, practice worksheets, and solved model test papers. You can download these materials and study offline, making them perfect for exam preparation and revision.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How long do I have access to the course content?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                Once enrolled, you get lifetime access to the course content. You can watch videos and download materials as many times as you need. This allows you to revisit complex topics and revise at your own pace throughout your academic journey.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>Can I get a certificate after completing the course?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                Yes! Upon completing a course and scoring above 70% in the final assessment, you&apos;ll receive a digital certificate signed by Shakil Sir. These certificates can be downloaded, printed, and used for academic or professional purposes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground mb-4 max-w-[580px]">
                We accept all major Bangladeshi payment methods including SSLCommerz, Bkash, Rocket, and Nagad. All payments are processed securely, and you receive instant access to course materials once payment is confirmed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Section>
  )
}
