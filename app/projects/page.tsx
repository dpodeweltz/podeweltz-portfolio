'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../../components/ui/Button';
import PageTransition, { FadeIn, StaggeredList } from '../../components/PageTransition';
import { getProjectPlaceholder } from '../../utils/placeholder';

// Define the project type
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

// Sample project data
const projects: Project[] = [
  {
    id: 'eco-commerce',
    title: 'Eco Commerce Platform',
    description: 'A sustainable e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product filtering, cart functionality, and payment processing.',
    image: getProjectPlaceholder('web', 800, 600),
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    demoUrl: 'https://eco-commerce.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/eco-commerce',
    featured: true
  },
  {
    id: 'health-tracker',
    title: 'Health Tracking Application',
    description: 'A comprehensive health tracking application allowing users to monitor fitness activities, nutrition, and set health goals. Includes data visualization and progress tracking.',
    image: getProjectPlaceholder('mobile', 800, 600),
    technologies: ['React Native', 'Firebase', 'Chart.js', 'TypeScript'],
    demoUrl: 'https://health-tracker.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/health-tracker'
  },
  {
    id: '3d-portfolio',
    title: '3D Portfolio Showcase',
    description: 'An interactive 3D portfolio website showcasing creative work using Three.js and WebGL. Features immersive navigation and responsive design.',
    image: getProjectPlaceholder('3d', 800, 600),
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    demoUrl: 'https://3d-portfolio.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/3d-portfolio',
    featured: true
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Service Chatbot',
    description: 'An intelligent chatbot for customer service, built with natural language processing capabilities. Integrates with existing CRM systems and provides analytics.',
    image: getProjectPlaceholder('ai', 800, 600),
    technologies: ['Python', 'TensorFlow', 'NLP', 'Azure'],
    demoUrl: 'https://ai-chatbot.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/ai-chatbot'
  },
  {
    id: 'social-dashboard',
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for social media management and analytics. Tracks engagement metrics across multiple platforms and visualizes trends.',
    image: getProjectPlaceholder('data', 800, 600),
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://social-dashboard.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/social-dashboard'
  },
  {
    id: 'weather-app',
    title: 'Real-time Weather Application',
    description: 'A weather application providing real-time forecasts, radar imagery, and severe weather alerts. Features geolocation and customizable notifications.',
    image: getProjectPlaceholder('web', 800, 600),
    technologies: ['React', 'OpenWeatherAPI', 'PWA', 'Geolocation API'],
    demoUrl: 'https://weather-app.example.com',
    codeUrl: 'https://github.com/davidpodeweltz/weather-app'
  }
];

// Project category filters
const categories = ['All', 'React', 'Node.js', 'TypeScript', 'Three.js', 'Python'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'All' 
    ? projects
    : projects.filter(project => project.technologies.includes(filter));

  return (
    <PageTransition>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                My Projects
              </h1>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Explore my recent work across web development, mobile applications, and interactive experiences.
                Each project represents a unique challenge and solution.
              </p>
            </div>
          </FadeIn>

          {/* Filter categories */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-pressed={filter === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Projects grid */}
          <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
                  project.featured ? 'border-2 border-blue-500' : ''
                } h-full flex flex-col`}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-auto">
                    {project.demoUrl && (
                      <Button href={project.demoUrl} variant="primary" size="sm" isExternal>
                        Live Demo
                      </Button>
                    )}
                    {project.codeUrl && (
                      <Button href={project.codeUrl} variant="outline" size="sm" isExternal>
                        View Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </StaggeredList>
          
          {filteredProjects.length === 0 && (
            <FadeIn>
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  No projects found for this filter.
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Try selecting a different category or view all projects.
                </p>
                <Button 
                  variant="primary" 
                  size="md" 
                  className="mt-4"
                  onClick={() => setFilter('All')}
                >
                  View All Projects
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
