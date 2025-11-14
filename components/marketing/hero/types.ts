import type { ReactNode } from "react";
import type { ButtonVariants } from "../../ui/button";

// Hero button properties
export interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonVariants["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

// Hero component main properties
export interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

// Example category
export interface ExampleCategory {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  examples: Example[];
}

// Example item
interface Example {
  title: string;
  description: string;
  preview: string;
}

// Feedback information
export interface Feedback {
  show: boolean;
  message: string;
  type: string;
}

// Typewriter effect timer references
export interface ActiveTimers {
  typingIntervals: NodeJS.Timeout[];
  erasingIntervals: NodeJS.Timeout[];
  pauseTimers: NodeJS.Timeout[];
  baseAnimation: any;
}
