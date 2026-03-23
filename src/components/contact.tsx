'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast, { Toaster } from 'react-hot-toast'

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const isDark = document.documentElement.classList.contains('dark')
          setIsDarkMode(isDark)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const loadingToast = toast.loading('Sending your message...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message.')
      }

      setIsSubmitted(true)

      toast.dismiss(loadingToast)
      toast.success(`Thanks ${formData.name}! Your message has been sent. I'll get back to you soon.`)

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Failed to send message. Please try again later.')

      toast.dismiss(loadingToast)
      toast.error('Something went wrong sending your message. Please try again or contact me directly via email.')

      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-neutral-50 py-20 dark:bg-neutral-800" ref={ref}>
      <div className="container mx-auto px-4">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
            },
            success: {
              style: {
                background: isDarkMode ? '#333' : '#fff',
                border: isDarkMode ? '1px solid #10B981' : '1px solid #10B981',
                color: isDarkMode ? '#fff' : '#333',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: isDarkMode ? '#333' : '#fff',
              },
            },
            error: {
              style: {
                background: isDarkMode ? '#333' : '#fff',
                border: isDarkMode ? '1px solid #EF4444' : '1px solid #EF4444',
                color: isDarkMode ? '#fff' : '#333',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: isDarkMode ? '#333' : '#fff',
              },
            },
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-12 text-center font-pixel text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
            Get in Touch
          </h2>
          <div className="grid gap-12 rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900 lg:grid-cols-2">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-neutral-900 shadow-xs focus:border-red-500 focus:ring-2 focus:ring-red-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="btn-primary relative w-full overflow-hidden"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isSubmitting ? 0 : 1,
                      y: isSubmitting ? -20 : 0,
                    }}
                  >
                    Send Message
                  </motion.div>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                    </motion.div>
                  )}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-white"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              </form>
            </div>
            <div className="flex flex-col justify-center space-y-8 lg:pl-8">
              <div>
                <h3 className="mb-4 font-pixel text-xl font-semibold text-neutral-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-red-800 dark:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:atif.khalil@solvify.be"
                      className="text-neutral-600 hover:text-red-800 dark:text-neutral-300 dark:hover:text-red-500"
                    >
                      atif.khalil@solvify.be
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-red-800 dark:text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-neutral-600 dark:text-neutral-300">+32 499 89 93 24</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 font-pixel text-xl font-semibold text-neutral-900 dark:text-white">
                  Follow Me
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/atifkhalil"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-neutral-600 transition-colors hover:text-red-800 dark:text-neutral-300 dark:hover:text-red-500"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/atif-k-04b037225/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-neutral-600 transition-colors hover:text-red-800 dark:text-neutral-300 dark:hover:text-red-500"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
