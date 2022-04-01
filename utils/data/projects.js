// Return an array of all project data
export function getAllProjects() {
  return [
    {
      title: 'kylies.photos',
      type: 'frontend',
      tech: ['next.js'],
      description:
        'My hiking blog and climbing log, built using the Notion API.',
      previewImgUrl:
        'https://raw.githubusercontent.com/kale-stew/climb-log/main/public/open-graph/home.jpg',
      url: 'https://www.kylies.photos',
    },
    {
      title: 'Now',
      type: 'frontend',
      tech: ['react', 'node'],
      description:
        "What I'm reading, listening to, working on, celebrating, and watching.",
      previewImgUrl:
        'https://raw.githubusercontent.com/kale-stew/kale-stew.github.io/dev/public/open-graph/now.jpg',
      url: 'https://kylieis.online/now',
    },
  ]
}
