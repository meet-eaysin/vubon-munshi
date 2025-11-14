

import { AlertCircle } from 'lucide-react'
import type { Feedback } from '../types'

interface AppDescriptionFormFeedbackProps {
  feedback: Feedback
}

/**
 * App description form feedback component
 */
export const AppDescriptionFormFeedback: React.FC<AppDescriptionFormFeedbackProps> = ({
  feedback
}) => {
  if (!feedback.show || feedback.type !== 'error') return null;

  return (
    <div className='transition-all duration-300 ease-in-out mt-2 animate-in fade-in slide-in-from-top-2 duration-300'>
      <div className='px-3 py-2 rounded-md text-sm bg-destructive/10 text-destructive flex items-center gap-2 ring-1 ring-destructive/30'>
        <AlertCircle className="size-4" />
        {feedback.message}
      </div>
    </div>
  )
} 