'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { projects } from '@/data'

const categoryGradients: Record<string, string> = {
  enterprise: 'from-blue-900/80 to-indigo-900/80',
  saas: 'from-red-900/80 to-rose-900/80',
  'client-work': 'from-amber-900/80 to-orange-900/80',
  community: 'from-emerald-900/80 to-teal-900/80',
}

const categoryLabels: Record<string, string> = {
  enterprise: 'Enterprise',
  saas: 'SaaS',
  'client-work': 'Client Work',
  community: 'Community',
}

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const gradient = categoryGradients[project.category] || 'from-neutral-800 to-neutral-900'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:backdrop-blur-xs"
    >
      {/* Image or gradient placeholder */}
      <div className="relative aspect-video overflow-hidden">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${gradient}`}>
            <span className="font-pixel text-lg text-white/80">{project.title.charAt(0)}</span>
          </div>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
          {categoryLabels[project.category]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-pixel text-sm font-bold text-neutral-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/50 dark:text-red-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-red-800 transition-colors hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          >
            View Live
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="bg-neutral-50 py-32 dark:bg-neutral-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-16 text-center font-pixel text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
            Featured Projects
          </h2>

          {/* Featured Project Spotlight */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mx-auto mb-16 max-w-5xl"
            >
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:backdrop-blur-xs">
                <div className="grid gap-0 lg:grid-cols-2">
                  {/* Gradient visual */}
                  <div className="relative flex items-center justify-center bg-linear-to-br from-blue-900 to-indigo-900 p-12">
                    <div className="text-center">
                      <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-xs">
                        Flagship Project
                      </div>
                      <h3 className="font-pixel text-xl font-bold text-white lg:text-2xl">
                        {featuredProject.title}
                      </h3>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
                    <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-white/5" />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-10">
                    <p className="mb-6 text-neutral-600 dark:text-neutral-300">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/50 dark:text-red-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-6 w-fit"
                      >
                        View Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Project Grid */}
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} inView={inView} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
