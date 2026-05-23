export interface PostMeta {
  id: string
  title: string
  description: string | null
  category: string
  date: string
  type: 'blog' | 'talk'
  tags?: string
}

export interface BlogPost extends PostMeta {
  content: string
  category: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  featured: boolean
  previewImgUrl: string
  url: string
  date: string
}

export interface TalkItem {
  id: string
  title: string
  description: string
  category: string
  date: string
  presentedAt: {
    eventName: string
    eventType: 'meetup' | 'conference'
    eventDate: string
    location: string
  }[]
  tech?: string[]
  type: 'talk'
}

export interface NowEntry {
  date: string
  location: string | null
  celebrate: string | null
  read: string | null
  travel: string | null
  learn: string | null
  watch: string | null
  listen: string | null
  work: string | null
}

export const METADATA = {
  fullName: 'Kylie Czajkowski',
  firstName: 'Kylie',
  siteName: 'kylieis.online',
}

export const SOCIAL_LINKS = [
  { label: 'Email', url: 'mailTo:hello@kylieis.online' },
  { label: 'Bluesky', url: 'https://bsky.app/profile/kylieis.online' },
  { label: 'Github', url: 'https://github.com/kale-stew' },
  { label: 'Instagram', url: 'https://instagram.com/kalestewski' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kylieski/' },
]

export const CATEGORIES = ['all', 'ai', 'react', 'nextjs', 'notion', 'typescript', 'graphql'] as const
export type Category = (typeof CATEGORIES)[number]

export const PERSONAL_TIMELINE = [
  {
    jobTitle: 'Engineering Manager',
    company: 'Cloudflare',
    location: 'San Francisco, California',
    startDate: 'Jan 2025',
    endDate: 'beyond',
    description: 'Leading a team focused on Growth of the Developer Platform.',
  },
  {
    jobTitle: 'Engineering Manager',
    company: 'Vercel',
    location: 'San Francisco, California',
    startDate: 'Jul 2022',
    endDate: 'Dec 2024',
    description: 'Led the Growth, Marketing, and Domains teams.',
  },
  {
    jobTitle: 'Software Engineer',
    company: 'Vercel',
    location: 'Colorado',
    startDate: 'Apr 2022',
    endDate: 'Jul 2022',
    description: 'Introduced new features to the marketing website and platform product.',
  },
  {
    jobTitle: 'Software + Solutions Engineer',
    company: 'freelance',
    location: 'Colorado',
    startDate: 'Nov 2020',
    endDate: 'Apr 2022',
    description: 'Consulted with businesses to address software and organizational needs.',
  },
  {
    jobTitle: 'Ambassador',
    company: 'Notion.so',
    location: 'Denver, Colorado',
    startDate: 'Oct 2019',
    endDate: 'current',
    description: 'First official Ambassador in the United States.',
  },
  {
    jobTitle: 'Software Engineer II',
    company: 'Formidable',
    location: 'Denver, Colorado',
    startDate: 'Jan 2019',
    endDate: 'Sep 2020',
    description: 'Maintained Spectacle. Developed enterprise applications using React, AWS Lambdas, GraphQL, TypeScript, and Next.js.',
  },
  {
    jobTitle: 'First Conference Talk',
    company: 'Zeit Day',
    location: 'San Francisco, California',
    startDate: 'Apr 27, 2018',
    description: "Presented 'Teaching Machines How to Do Cool Things with JavaScript'",
  },
  {
    jobTitle: 'Software Engineer I',
    company: 'Formidable',
    location: 'Phoenix, Arizona',
    startDate: 'Jan 2018',
    endDate: 'Jan 2019',
    description: 'Embedded engineer on enterprise teams. Developed microservices using Kubernetes, Firebase, Node.js, GCP.',
  },
  {
    jobTitle: 'Student',
    company: 'DevMountain',
    location: 'Phoenix, Arizona',
    startDate: 'Aug 2017',
    endDate: 'Nov 2017',
    description: "Full-time 12-week web development course, focused on fullstack JavaScript.",
  },
]
