import Bento from '@/components/marketing/bento'
import CTA from '@/components/marketing/cta'
import FAQ from '@/components/marketing/faq'
import Features from '@/components/marketing/features'
import Footer from '@/components/marketing/footer'
import Hero from '@/components/marketing/hero/index'
import Navbar from '@/components/marketing/nav'
import Pricing from '@/components/marketing/price'

export default async function Home() {

  return (
    <main className='min-h-screen w-full overflow-hidden bg-(--background-landing) text-(--foreground-landing)'>
      <Navbar />
      <Hero />
      <Bento />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}


// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   BookOpen,
//   Users,
//   Award,
//   Brain,
//   Play,
//   Star,
//   CheckCircle,
//   ArrowRight,
//   GraduationCap,
//   Clock,
//   Zap
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Navigation */}
//       <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <GraduationCap className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold text-gray-900">With Shakil Sir</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link href="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
//             <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
//             <Button asChild>
//               <Link href="/signup">Get Started</Link>
//             </Button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto text-center max-w-4xl">
//           <Badge variant="secondary" className="mb-4">
//             🎓 Bangladesh&apos;s #1 Online Learning Platform
//           </Badge>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Master Your Studies with
//             <span className="text-blue-600 block">Expert Guidance</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join thousands of Bangladeshi students excelling in Mathematics, Physics, Chemistry, and more.
//             Learn at your pace with interactive videos, AI-powered quizzes, and personalized support.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="text-lg px-8 py-6" asChild>
//               <Link href="/courses">
//                 <Play className="mr-2 h-5 w-5" />
//                 Start Learning Today
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
//               <Link href="#features">Learn More</Link>
//             </Button>
//           </div>
//           <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
//             <div className="flex items-center">
//               <Users className="h-4 w-4 mr-1" />
//               10,000+ Students
//             </div>
//             <div className="flex items-center">
//               <BookOpen className="h-4 w-4 mr-1" />
//               50+ Courses
//             </div>
//             <div className="flex items-center">
//               <Award className="h-4 w-4 mr-1" />
//               95% Success Rate
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Why Choose With Shakil Sir?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience learning like never before with our cutting-edge features designed for Bangladeshi students.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                   <Play className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <CardTitle>Interactive Video Lessons</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   High-quality video lectures with progress tracking, pause/resume functionality, and interactive elements.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//                   <Brain className="h-6 w-6 text-green-600" />
//                 </div>
//                 <CardTitle>AI-Powered Learning</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Get instant help from our AI tutor, take AI-generated quizzes, and receive personalized learning recommendations.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//                   <Award className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <CardTitle>Certificates & Recognition</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Earn verified certificates upon course completion. Showcase your achievements to schools and employers.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
//                   <BookOpen className="h-6 w-6 text-orange-600" />
//                 </div>
//                 <CardTitle>Study Materials</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Access downloadable notes, practice papers, and reference materials curated by expert teachers.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//                   <Clock className="h-6 w-6 text-red-600" />
//                 </div>
//                 <CardTitle>Learn at Your Pace</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Flexible learning schedule. Pause, rewind, and revisit lessons anytime. Lifetime access to enrolled courses.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//               <CardHeader>
//                 <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
//                   <Zap className="h-6 w-6 text-teal-600" />
//                 </div>
//                 <CardTitle>Affordable Education</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">
//                   Quality education at affordable prices. Special discounts for students and multiple payment options.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Popular Subjects */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Popular Subjects
//             </h2>
//             <p className="text-xl text-gray-600">
//               Master the subjects that matter most for your academic success
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { name: "Mathematics", icon: "🔢", color: "bg-blue-500" },
//               { name: "Physics", icon: "⚛️", color: "bg-green-500" },
//               { name: "Chemistry", icon: "🧪", color: "bg-purple-500" },
//               { name: "English", icon: "📚", color: "bg-orange-500" },
//             ].map((subject) => (
//               <Card key={subject.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
//                 <CardContent className="p-6">
//                   <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
//                     {subject.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
//                   <p className="text-gray-600">Comprehensive courses with expert guidance</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               What Our Students Say
//             </h2>
//             <p className="text-xl text-gray-600">
//               Real success stories from students who transformed their academic performance
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Rahim Ahmed",
//                 grade: "Class 10",
//                 message: "With Shakil Sir's courses, I improved my math grade from C to A+. The AI tutor helped me understand difficult concepts instantly!",
//                 rating: 5
//               },
//               {
//                 name: "Fatima Begum",
//                 grade: "HSC Student",
//                 message: "The physics course is amazing! The video lessons are clear and the practice quizzes really helped me prepare for my exams.",
//                 rating: 5
//               },
//               {
//                 name: "Mohammad Ali",
//                 grade: "SSC Student",
//                 message: "I love how I can learn at my own pace. The certificates really motivated me to complete all courses. Highly recommended!",
//                 rating: 5
//               }
//             ].map((testimonial, index) => (
//               <Card key={index} className="border-0 shadow-lg">
//                 <CardContent className="p-6">
//                   <div className="flex mb-4">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                     ))}
//                   </div>
//                   <p className="text-gray-600 mb-4 italic">&quot;{testimonial.message}&quot;</p>
//                   <div>
//                     <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                     <p className="text-sm text-gray-500">{testimonial.grade}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold mb-4">
//             Affordable Quality Education
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Start learning today with our flexible pricing options
//           </p>

//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//             <Card className="bg-white/10 border-white/20 text-white">
//               <CardHeader>
//                 <CardTitle className="text-2xl">Free Courses</CardTitle>
//                 <div className="text-4xl font-bold">৳0</div>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-left">
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Preview lessons
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Basic quizzes
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Community access
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="bg-white text-gray-900 scale-105">
//               <CardHeader>
//                 <CardTitle className="text-2xl">Premium Course</CardTitle>
//                 <div className="text-4xl font-bold text-blue-600">৳500</div>
//                 <p className="text-sm text-gray-600">per course</p>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-left">
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
//                     Full course access
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
//                     AI tutor support
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
//                     Downloadable materials
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
//                     Certificate of completion
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="bg-white/10 border-white/20 text-white">
//               <CardHeader>
//                 <CardTitle className="text-2xl">Study Materials</CardTitle>
//                 <div className="text-4xl font-bold">৳200</div>
//                 <p className="text-sm opacity-75">per package</p>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-left">
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Practice papers
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Formula sheets
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Quick revision notes
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-900 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold mb-4">
//             Ready to Excel in Your Studies?
//           </h2>
//           <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//             Join thousands of successful students who transformed their academic performance with With Shakil Sir.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700" asChild>
//               <Link href="/signup">
//                 Start Your Journey
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900" asChild>
//               <Link href="/courses">Browse Courses</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <GraduationCap className="h-8 w-8 text-blue-600" />
//                 <span className="text-2xl font-bold text-gray-900">With Shakil Sir</span>
//               </div>
//               <p className="text-gray-600">
//                 Empowering Bangladeshi students with quality online education and AI-powered learning tools.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><Link href="/courses" className="hover:text-gray-900">Courses</Link></li>
//                 <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
//                 <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
//                 <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
//                 <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
//               <p className="text-gray-600 mb-2">Follow us for updates</p>
//               <div className="flex space-x-4">
//                 <span className="text-gray-400">📘 Facebook</span>
//                 <span className="text-gray-400">📷 Instagram</span>
//                 <span className="text-gray-400">🐦 Twitter</span>
//               </div>
//             </div>
//           </div>
//           <div className="border-t mt-8 pt-8 text-center text-gray-600">
//             <p>&copy; 2024 With Shakil Sir. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

