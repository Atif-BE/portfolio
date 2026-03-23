'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '@/data'

export const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="bg-white py-32 dark:bg-neutral-900" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-16 text-center font-pixel text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl"
        >
          Professional Experience
        </motion.h2>
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-2.5 top-3 bottom-3 w-px bg-red-200 dark:bg-red-800" />
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="relative mb-12 flex gap-8 last:mb-0"
            >
              <div className="relative flex-none">
                <div className="relative z-10 h-6 w-6 rounded-full bg-red-800 ring-4 ring-white dark:ring-neutral-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-pixel text-lg font-bold text-neutral-900 dark:text-white">{exp.company}</h3>
                <p className="text-lg font-semibold text-red-800 dark:text-red-500">{exp.role}</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{exp.duration}</p>
                <p className="mt-4 text-neutral-600 dark:text-neutral-300">{exp.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 space-y-2 text-neutral-600 dark:text-neutral-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-red-800 dark:bg-red-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
