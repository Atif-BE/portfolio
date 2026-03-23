export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: 'enterprise' | 'saas' | 'client-work' | 'community'
  featured?: boolean
}

export interface Experience {
  company: string
  role: string
  duration: string
  description: string
  technologies: string[]
  achievements: string[]
}
