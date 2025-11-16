"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Star, Users, Icon, PiIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  price: number;
  promoPrice?: number;
  isFree: boolean;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  subject: 'MATHEMATICS' | 'PHYSICS' | 'CHEMISTRY' | 'BANGLA' | 'ENGLISH';
  tags: string[];
  teacher: {
    user: {
      name: string;
    };
  };
  _count?: {
    enrollments: number;
  };
  reviews?: Array<{
    rating: number;
  }>;
}

const mockPopularCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Mathematics for Class 9-10',
    slug: 'complete-mathematics-class-9-10',
    description: 'Master mathematics with comprehensive lessons covering algebra, geometry, and statistics.',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=740&h=350&fit=crop',
    price: 2500,
    promoPrice: 2000,
    isFree: false,
    level: 'BEGINNER',
    subject: 'MATHEMATICS',
    tags: ['Algebra', 'Geometry', 'Statistics'],
    teacher: {
      user: {
        name: 'Shakil Sir'
      }
    },
    _count: {
      enrollments: 1250
    },
    reviews: [
      { rating: 5 },
      { rating: 4 },
      { rating: 5 }
    ]
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    slug: 'physics-fundamentals',
    description: 'Learn the basics of physics including mechanics, thermodynamics, and electromagnetism.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=740&h=350&fit=crop',
    price: 2200,
    isFree: false,
    level: 'INTERMEDIATE',
    subject: 'PHYSICS',
    tags: ['Mechanics', 'Thermodynamics'],
    teacher: {
      user: {
        name: 'Dr. Rahman'
      }
    },
    _count: {
      enrollments: 890
    },
    reviews: [
      { rating: 5 },
      { rating: 5 },
      { rating: 4 }
    ]
  },
  {
    id: '3',
    title: 'Chemistry for Beginners',
    slug: 'chemistry-beginners',
    description: 'Introduction to chemistry concepts with practical examples and experiments.',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=740&h=350&fit=crop',
    price: 1800,
    promoPrice: 1500,
    isFree: false,
    level: 'BEGINNER',
    subject: 'CHEMISTRY',
    tags: ['Organic Chemistry', 'Inorganic'],
    teacher: {
      user: {
        name: 'Prof. Ahmed'
      }
    },
    _count: {
      enrollments: 675
    },
    reviews: [
      { rating: 4 },
      { rating: 5 },
      { rating: 4 }
    ]
  }
];

const calculateAverageRating = (reviews?: Array<{ rating: number }>) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const Courses = () => {
  return (
    <div className="relative pt-10 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {mockPopularCourses?.map((course, index) => {
          const averageRating = calculateAverageRating(course.reviews);

          return (
            <Link
              key={course.id}
              href={"#"}
              className={cn(
                "group bg-background rounded-xl overflow-hidden border",
              )}
            >
              <div className="relative aspect-[4/2]">
                <Image
                  loading="eager"
                  width={740}
                  height={350}
                  src={
                    course.thumbnail ? course.thumbnail : "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=740&h=350&fit=crop"
                  }
                  alt="placeholder"
                  className="size-full object-cover object-top"
                />
                <p className="absolute z-10 top-3 right-3 text-foreground bg-gray-900 bg-opacity-35 rounded-full flex items-center justify-center p-1.5">
                  <span className="sr-only">Work on it actually!</span>
                  <PiIcon className="size-6 text-white" />
                </p>

              </div>

              <div className="py-3 px-4 border-t">
                <p className="font-medium text-foreground mb-1.5">{course.title}</p>
                <p className="text-sm text-muted-foreground/85">{course.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};