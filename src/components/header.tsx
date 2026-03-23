'use client'

import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const navLinks = [
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'mx-4 mt-4 rounded-full bg-white/40 shadow-lg backdrop-blur-md dark:bg-neutral-900/30'
          : 'bg-white/20 backdrop-blur-xs dark:bg-neutral-900/10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="font-pixel text-lg font-bold text-neutral-900 drop-shadow-xs dark:text-white">
            Atif Khalil
          </a>

          {/* Desktop nav */}
          <nav className="hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-pixel text-sm text-neutral-900 drop-shadow-xs dark:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-linear-to-r from-red-400 to-red-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="font-pixel text-sm text-neutral-900 drop-shadow-xs transition-colors hover:text-red-800 dark:text-white dark:hover:text-red-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="font-pixel text-sm text-neutral-900 drop-shadow-xs transition-colors hover:text-red-800 dark:text-white dark:hover:text-red-500"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-neutral-900 dark:bg-white"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-neutral-900 dark:bg-white"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-neutral-900 dark:bg-white"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neutral-200/20 bg-white/90 backdrop-blur-lg dark:border-neutral-700/20 dark:bg-neutral-900/90 md:hidden"
          >
            <div className="container mx-auto space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 font-pixel text-sm text-neutral-900 transition-colors hover:bg-red-50 dark:text-white dark:hover:bg-red-900/20"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
