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
  type?: string
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

export const PROJECTS: Project[] = [
  {
    title: 'kylies.photos',
    date: '2021-02-25',
    type: 'project',
    tech: ['next.js', 'node'],
    featured: true,
    description: 'My hiking blog and climbing log, built using the Notion API.',
    previewImgUrl: 'https://raw.githubusercontent.com/kale-stew/climb-log/main/public/open-graph/home.jpg',
    url: 'https://www.kylies.photos',
  },
  {
    title: 'Now',
    date: '2019-10-11',
    type: 'project',
    tech: ['react'],
    featured: true,
    description: "What I'm reading, listening to, working on, celebrating, and watching.",
    previewImgUrl: 'https://raw.githubusercontent.com/kale-stew/kylieis.online/main/public/open-graph/now.jpg',
    url: '/now',
  },
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export const PHOTOS = [
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/b966686d-364a-4364-60fe-2c5512b89a00/public', alt: 'Outside of Mammoth Lakes, California' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/52bfe7f1-63d7-4899-697c-22cabada3600/public', alt: 'Waimea Bay, Oahu' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/e781d047-cb85-4ff1-c159-713d9d4ba300/public', alt: 'Rush hour sunset on the Golden Gate Bridge' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/e8183ede-c0cd-4c42-7e4d-753d0e672000/public', alt: 'Ocean panorama sailing through the Lyngen Alps, Norway' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/363f550d-7d89-444a-685f-73a63268fa00/public', alt: 'Northern Lights seen off of a sailboat, Norway' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/7821ed9d-f915-4400-8d02-88e6909b4000/public', alt: 'Precamp sunset on the water, Norway' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/4c58f676-2f66-41b1-64aa-8d4f167c8300/public', alt: 'View out the back of our sailboat, Norway' },
]

export const TAGLINES = [
  'Web developer and public speaker',
  'Building on the edge',
  'Developing the agent development experience',
  'Mountaineer on the weekends',
  'Making things fast',
  'Working with Workers',
]

// Inline SVG icons for social links (no CDN dependency)
export const SOCIAL_ICONS: Record<string, string> = {
  mail: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  bluesky: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"/></svg>',
  github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
}

export const SOCIAL_LINKS = [
  { label: 'Email', url: 'mailto:hello@kylieis.online', icon: 'mail' },
  { label: 'Bluesky', url: 'https://bsky.app/profile/kylieis.online', icon: 'bluesky' },
  { label: 'Github', url: 'https://github.com/kale-stew', icon: 'github' },
  { label: 'Instagram', url: 'https://instagram.com/kalestewski', icon: 'instagram' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kylieski/', icon: 'linkedin' },
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
