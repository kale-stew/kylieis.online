// Return an array of all project data
export function getAllProjects() {
  return [
    {
      title: 'kylies.photos',
      date: '2021-02-25',
      type: 'frontend',
      tech: ['next.js', 'node'],
      featured: true,
      description:
        'My hiking blog and climbing log, built using the Notion API.',
      previewImgUrl:
        'https://raw.githubusercontent.com/kale-stew/climb-log/main/public/open-graph/home.jpg',
      url: 'https://www.kylies.photos',
    },
    {
      title: 'Now',
      date: '2019-10-11',
      type: 'frontend',
      tech: ['react'],
      featured: true,
      description:
        "What I'm reading, listening to, working on, celebrating, and watching.",
      previewImgUrl:
        'https://raw.githubusercontent.com/kale-stew/kylieis.online/main/public/open-graph/now.jpg',
      url: '/now',
    },
  ]
}

// Return any project flagged 'featured' for the home page
export function getFeaturedProjects() {
  const all = getAllProjects()
  return all.filter((project) => project.featured)
}
