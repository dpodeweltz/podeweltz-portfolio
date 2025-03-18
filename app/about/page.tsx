'use client';

import Image from 'next/image';
import Button from '../../components/ui/Button';
import PageTransition, { FadeIn } from '../../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left column - Profile image */}
            <FadeIn direction="left" delay={0.1}>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/profile.jpg"
                  alt="David Podeweltz at beach sunset with camper van"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>

            {/* Right column - About text */}
            <FadeIn direction="right" delay={0.2}>
              <div className="flex flex-col space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  About Me
                </h1>

                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Hi, I&apos;m David Podeweltz, a passionate full-stack developer and UX designer with over 5 years 
                    of experience creating web applications that are both beautiful and functional.
                  </p>
                  
                  <p>
                    My journey in technology began with a fascination for how digital products can solve real-world 
                    problems. This led me to pursue a degree in Computer Science, followed by specialized training 
                    in user experience design.
                  </p>
                  
                  <p>
                    I believe that great software should be both technically excellent and delightful to use. My 
                    approach combines clean, maintainable code with thoughtful, user-centered design principles.
                  </p>

                  <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    Skills & Expertise
                  </h2>
                  
                  <ul className="space-y-2">
                    <li><span className="font-medium">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS</li>
                    <li><span className="font-medium">Backend:</span> Node.js, Express, Python, SQL/NoSQL databases</li>
                    <li><span className="font-medium">Design:</span> Figma, Adobe XD, UI/UX principles</li>
                    <li><span className="font-medium">Other:</span> Git, CI/CD, Agile methodologies</li>
                  </ul>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    href="/contact"
                    variant="primary"
                    size="md"
                  >
                    Get in Touch
                  </Button>
                  <Button 
                    href="/resume.pdf"
                    variant="outline"
                    size="md"
                    isExternal
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Additional section */}
          <FadeIn delay={0.4} direction="up">
            <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
                My Philosophy
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Innovation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I&apos;m constantly exploring new technologies and approaches to create better solutions and enhance user experiences.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Collaboration</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I believe that the best products come from collaborative efforts, open communication, and diverse perspectives.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Quality</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I&apos;m committed to writing clean, maintainable code and creating accessible, performant applications that stand the test of time.
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
}
