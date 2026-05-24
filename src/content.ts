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
    previewImgUrl: '/og?title=Now&subtitle=what%20i%27m%20up%20to',
    url: '/now',
  },
]

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured)
}

export interface Photo {
  src: string
  alt: string
  location: string
}

export const PHOTOS: Photo[] = [
  // San Francisco / Bay Area
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/28d639b1-04bd-47ef-6445-07bd6618d400/public', alt: 'Golden Gate Bridge viewed from Fort Mason', location: 'Fort Mason, SF, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/d2b975ee-c056-45ea-833b-069480c72300/public', alt: 'Golden Gate Bridge tower from the walkway', location: 'San Francisco, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/4d95873b-909c-464e-0617-1cde69bd5000/public', alt: 'Sunset behind the Cliff House', location: 'Ocean Beach, SF, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/20e6d214-7cbb-4434-efd8-bc8f6ddc5500/public', alt: 'Sunset over the Pacific at Baker Beach', location: 'Baker Beach, SF, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/b014a68a-10f8-4c86-9e64-4450ee609700/public', alt: 'Sunset on Mount Sutro', location: 'Inner Sunset, SF, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/c4caf090-5888-47fc-b6b7-deeddfa70500/public', alt: 'Sunset at Pedro Point', location: 'Pacifica, CA' },
  // Colorado
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/c58fda33-f329-4047-4f2e-fddb70a23a00/public', alt: 'Top of the Elk Camp chairlift', location: 'Aspen-Snowmass, CO' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/ea123215-7183-4a2e-e20b-a99d37d97500/public', alt: 'Scrambling up the second Flatiron', location: 'Boulder, CO' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/26b26e1a-07e1-4881-a523-ee919401ba00/public', alt: 'Sunset alpenglow against Little Bear Peak', location: 'San Juan Mountains, CO' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/f75c9da1-6767-4b82-ed99-5c202c176f00/public', alt: 'Skiing uphill at Ski Cooper', location: 'Leadville, CO' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/43c1083e-1b74-4055-e962-6f9727091c00/public', alt: 'Goat friend at sunrise on Mount Sniktau', location: 'Loveland Pass, Colorado' },
  // Yosemite
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/c561c0ac-0866-4b4b-7777-c4d663580700/public', alt: 'Descending Glacier Point towards the Mist Trail', location: 'Yosemite National Park, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/c939fc9b-a368-47e1-a3d0-afcf75a3ed00/public', alt: 'Storm clouds over Half Dome', location: 'Yosemite National Park, CA' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/8abfa21c-7c98-4ca0-0569-4d920e4fa000/public', alt: 'Tunnel View of Yosemite Valley', location: 'Yosemite National Park, CA' },
  // Hawaii
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/aad40c68-a46b-4e2e-636a-7d1143197400/public', alt: 'HanakāpīʻAi Beach on the Napali Coast', location: 'Kauaʻi, HI' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/7bce8dfc-e822-4754-35aa-534b1210e800/public', alt: 'Aerial view of the Napali Coast', location: 'Kauaʻi, HI' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/d86a79fe-92c4-4f76-e9a9-5be494c15a00/public', alt: 'Aerial view of the Napali Coast ridgeline', location: 'Kauaʻi, HI' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/a023ab45-f2d2-4bac-2265-bff003b13f00/public', alt: 'Sunrise from the Kailalau Trail', location: 'Kauaʻi, HI' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/e7b1bcd5-13b7-45b9-aad6-510345539a00/public', alt: 'The Napali Coast seen from sea', location: 'Kauaʻi, HI' },
  // Other
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/ab9fd024-c8e4-4f96-4f17-7fde8d3f7b00/public', alt: 'Canyoneering through Horseplay Canyon', location: 'North Wash, UT' },
  { src: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/f998d48a-6d38-4d08-d5d2-c08bc14c3800/public', alt: 'Chicago skyline along Lake Michigan', location: 'Chicago, IL' },
]

export const TAGLINES = [
  'web developer and public speaker',
  'building on the edge',
  'developing the agent development experience',
  'mountaineer on the weekends',
  'making things fast',
  'working with Workers',
  'shipping from the summit',
  'peak bagger, problem solver',
  "building things that don't crash (usually)",
  'chronic early adopter',
  'agent of chaos',
  'hiking the sierras',
  'making the web weirder',
  'trying to make the machines like me',
  'edge case enthusiast',
  'learning in public',
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

export const CATEGORIES = ['ai', 'notion', 'react', 'typescript'] as const
export type Category = (typeof CATEGORIES)[number]

export interface TimelineJob {
  type: 'job'
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
}

export interface TimelineMilestone {
  type: 'milestone'
  title: string
  date: string
  location?: string
  image: string
}

export type TimelineEntry = TimelineJob | TimelineMilestone

export const PERSONAL_TIMELINE: TimelineEntry[] = [
  // 2025
  {
    type: 'job',
    jobTitle: 'Engineering Manager',
    company: 'Cloudflare',
    location: 'San Francisco, California',
    startDate: 'Jan 2025',
    endDate: 'beyond',
    description: 'Leads the Agent Experience team, building the developer experience for AI agents on the Workers platform.',
  },
  // 2024
  {
    type: 'milestone',
    title: 'Moved to San Francisco',
    date: 'Jun 2024',
    location: 'San Francisco, CA',
    image: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/e781d047-cb85-4ff1-c159-713d9d4ba300/public',
  },
  // 2023
  {
    type: 'milestone',
    title: 'Climbed Kilimanjaro',
    date: 'Sep 2023',
    location: 'Kilimanjaro National Park, Tanzania',
    image: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/3377d417-525a-46a7-c097-5bd1d396ef00/public',
  },
  {
    type: 'job',
    jobTitle: 'Engineering Manager',
    company: 'Vercel',
    location: 'San Francisco, California',
    startDate: 'Jul 2022',
    endDate: 'Dec 2024',
    description: 'Led the Growth, Marketing, and Domains teams.',
  },
  {
    type: 'job',
    jobTitle: 'Software Engineer',
    company: 'Vercel',
    location: 'Colorado',
    startDate: 'Apr 2022',
    endDate: 'Jul 2022',
    description: 'Introduced new features to the marketing website and platform product.',
  },
  // 2020
  {
    type: 'job',
    jobTitle: 'Software + Solutions Engineer',
    company: 'freelance',
    location: 'Colorado',
    startDate: 'Nov 2020',
    endDate: 'Apr 2022',
    description: 'Consulted with businesses to address software and organizational needs.',
  },
  // 2019
  {
    type: 'job',
    jobTitle: 'Ambassador',
    company: 'Notion.so',
    location: 'Denver, Colorado',
    startDate: 'Oct 2019',
    endDate: 'current',
    description: 'First official Ambassador in the United States.',
  },
  {
    type: 'job',
    jobTitle: 'Software Engineer II',
    company: 'Formidable',
    location: 'Denver, Colorado',
    startDate: 'Jan 2019',
    endDate: 'Sep 2020',
    description: 'Maintained Spectacle. Developed enterprise applications using React, AWS Lambdas, GraphQL, TypeScript, and Next.js.',
  },
  // 2018
  {
    type: 'milestone',
    title: 'First Conference Talk',
    date: 'Apr 2018',
    location: 'San Francisco, CA',
    // palace of the fine arts
    image: 'https://imagedelivery.net/I5sMCdZloThK9NfMgVFKOw/1a8ad2d9-9f80-45ad-1ccb-ca8fbd1f4000/public'
  },
  {
    type: 'job',
    jobTitle: 'Software Engineer I',
    company: 'Formidable',
    location: 'Phoenix, Arizona',
    startDate: 'Jan 2018',
    endDate: 'Jan 2019',
    description: 'Embedded engineer on enterprise teams. Developed microservices using Kubernetes, Firebase, Node.js, GCP.',
  },
  // 2017
  {
    type: 'job',
    jobTitle: 'Student',
    company: 'DevMountain',
    location: 'Phoenix, Arizona',
    startDate: 'Aug 2017',
    endDate: 'Nov 2017',
    description: "Full-time 12-week web development course, focused on fullstack JavaScript.",
  },
]
