// Return an array of all notion project data
export function getNotionProjects() {
  return [
    {
      title: 'Notion Office Hours: Building a Personal Wiki',
      type: 'video',
      description:
        'As a guest on this live-streamed event, I discuss personal workspaces, the conflicts that arise in using Notion for both personal and professional life management, and more with Notion Mastery course creator Marie Poulin.',
      previewImgUrl: '/images/preview-office-hour.png',
      url: 'https://youtu.be/YQCk5uCX3fg',
      date: 'September 2019',
    },
    {
      title: 'Recipe Box',
      type: 'template',
      previewImgUrl: '/images/preview-recipe-box.png',
      description:
        "Published on the Official Notion Template Gallery, this Recipe Box serves as an online database for recipes I have collected over the years. Users can sort by category (like 'Dinner' or 'Haven't Tried') and easily copy & paste the Shopping List into a separate Groceries page to simplify the grocery shopping process.",
      url: 'https://www.notion.so/templates/recipe-box',
      date: 'March 2020',
    },
    {
      title: 'Interview with Keep Productive',
      type: 'video',
      description:
        'Gave a detailed tour of my personal Notion workspace setup to the YouTube channel Keep Productive. I show my daily task management system, the recipe board to grocery list method, how I plan work and personal events from a weekly, monthly, and annual view, and more.',
      previewImgUrl: '/images/preview-keep-productive.png',
      url: 'https://www.keepproductive.com/blog/notion-set-up-kylie-stewart',
      date: 'June 2019',
    },
  ]
}
