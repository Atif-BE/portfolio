import { Project, Experience } from '@/types'

export const projects: Project[] = [
  {
    title: 'Multi-Agent AI Orchestration',
    description:
      'Enterprise multi-agent AI platform built for a pharmaceutical client. Features AI Foundry agents, automated workflows for authorization, learnings management and holiday booking, a Slack relay bot, RBAC-based SQL schema, Managed Identity auth, and scope guardrails with claim-based access control.',
    image: '',
    technologies: ['Azure AI Foundry', 'Logic Apps', 'Container Apps', 'SQL Server', 'Managed Identity', 'TypeScript'],
    category: 'enterprise',
    featured: true,
  },
  {
    title: 'AutoBill',
    description:
      'Automated billing and invoicing SaaS product for dealerships. Create invoices and workorders for customers using your own existing templates.',
    image: '/autobill.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    liveUrl: 'https://autobill.be',
    category: 'saas',
  },
  {
    title: 'RevMeet',
    description:
      'A meeting and revenue management product built on the T3 stack. Streamlines scheduling and revenue tracking for businesses.',
    image: '/revmeet.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'PostgreSQL'],
    liveUrl: 'https://revmeet.be',
    category: 'saas',
  },
  {
    title: 'Reflectly',
    description:
      'A reflection and journaling platform designed to help users build consistent self-improvement habits through guided prompts and progress tracking.',
    image: '/reflectly.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    liveUrl: 'https://reflectly.be',
    category: 'saas',
  },
  {
    title: 'GoldenCars',
    description:
      'A modern management system for a car dealership. Viewing customers and drafting invoices and workorders.',
    image: '/goldencars.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'client-work',
  },
  {
    title: 'ZeroRent Portal',
    description:
      'A portal for managing customers, loans and their payments. Customers view their loan progress while the admin dashboard manages customers and loans.',
    image: '/zerorent.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'client-work',
  },
  {
    title: 'BIIC Digital Infrastructure',
    description:
      'Digital infrastructure for the Belgium Islamic Information Centre. GDPR-compliant registration forms in Dutch for Maktab and Quran lesson programs, plus a complete brand and design system.',
    image: '/biic.png',
    technologies: ['Stripe', 'HubSpot Integration', 'Brand Design'],
    liveUrl: 'https://biic.be',
    category: 'community',
  },
]

export const experiences: Experience[] = [
  {
    company: 'IBM',
    role: 'Full Stack Developer',
    duration: '2022 - Present',
    description: 'Consulting Developer for a variety of enterprise clients.',
    technologies: ['React', 'TypeScript', 'Fastify', 'PostgreSQL'],
    achievements: [
      'Developed enterprise-scale web applications for major clients.',
      'Mentored junior developers.',
      'Led an internal product project built from scratch.',
    ],
  },
  {
    company: 'ZeroRent',
    role: 'CTO',
    duration: '2024 - Present',
    description: 'Creator of the ZeroRent portal and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    achievements: [
      'Created the ZeroRent portal and admin dashboard.',
    ],
  },
  {
    company: 'Solvify',
    role: 'Chief Nerd',
    duration: '2023 - Present',
    description: 'Helping businesses scale using IT.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    achievements: [
      'Built RevMeet, a meeting and revenue management product using the T3 stack.',
      'Developed Reflectly, a journaling and reflection platform.',
      'Developed AutoBill, an automated billing SaaS for dealerships.',
    ],
  },
]
