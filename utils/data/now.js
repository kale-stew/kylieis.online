import { sortByDateDesc } from '../helpers'

const all = [
  {
    date: '2022-03-31',
    location: 'At home in Georgetown, Colorado.',
    celebrate:
      "A few things! We eloped this past Monday, and I recently signed an offer to return to full-time work as a software engineer at a company I'm very excited about.",
    read: "'Braving the Wilderness' by Brené Brown.",
    travel: 'To Utah recently for some camping and hiking.',
    watch:
      "As Free As Can Be, a documentary about an unlikely climbing duo's pursuit of one the greatest challenges in sport climbing.",
  },
  {
    date: '2022-01-03',
    location: 'At home, in the mountains of Colorado.',
    read: "'The Magnificent Mountain Women: Adventures in the Colorado Rockies' by Janet Robertson & Arlene Blum.",
    travel:
      'Not for at least another 5 weeks while I recover from ankle surgery.',
    watch:
      'The Alpinist, a documentary about the late mountaineer Marc-André Leclerc.',
    listen: "Older episodes of one of my favorite podcasts, 'Darknet Diaries'.",
  },
  {
    date: '2021-08-01',
    location: 'At home, in the mountains of Colorado.',
    travel:
      "Recently down to the San Juan mountains for a friend's wedding and some hikes.",
    celebrate:
      'Our recent engagement! My partner Kyle and I got engaged last month.',
    learn: 'How to plan a wedding! 💍',
    work: 'A next.js website to display my hiking photos and log of climbs on.',
    read: "The first published report on the topography of San Juan Country, titled 'Summits To Reach' by Franklin Rhoda.",
    listen:
      "A new-to-me podcast called 'Cutting Edge' by the American Alpine Club.",
  },
  {
    date: '2021-06-22',
    location:
      'At camp near an alpine somewhere in the Maroon Bells Wilderness of Colorado.',
    travel: 'All over Colorado to explore new hiking areas and peaks.',
    celebrate:
      "Some exciting climbs like my recent trip to the summit of 'K2', Capitol Peak's gnarly 13,664' neighbor.",
    listen: "A Gimlet media podcast called 'Heavyweight'.",
    read: "A fascinating account of a handful of disasters in the high country titled 'Colorado 14er Disasters: Victims of the Game' by Mark Scott-Nash.",
    work: "Something to better familiarize myself with the Notion API now that it's been publicly released.",
  },
  {
    date: '2020-12-26',
    location:
      "At our friend's home in Castle Rock, house- and dog-sitting while they visit family for the holidays.",
    celebrate: 'The holidays! 🎄',
    learn:
      'How to integrate Spotify, with a specific focus on pain points for small business owners.',
    listen:
      "An equal part informative, funny, and infuriating podcast called 'Q-Anon Anonymous' that unpacks the ridiculous conspiracy theories the fringe group spreads.",
    read: "'Dune'! All three books crammed into one heavy hardback.",
    work: 'Developing my freelance business so I can handle a larger number of clients in the new year.',
  },
  {
    date: '2020-07-19',
    location:
      'Still in quarantine, still at home in downtown Denver, Colorado.',
    travel: 'Hopefully, eventually?',
    read: "'Never Split the Difference: Negotiating as if Your Life Depended on It' by Chris Voss, for a soft skills reading group.",
    watch: 'The series Community in its entirety for the first time.',
    listen: 'A lot of Glass Animals.',
    learn:
      'How to leverage k8s and docker to improve staged deployments for a microservice-heavy ecosystem.',
  },
  {
    date: '2020-04-10',
    location: 'In quarantine, at home in Denver.',
    travel: 'Hopefully, eventually? 😭',
    read: "'Broad Band: The Untold Story of the Women Who Made the Internet' by Claire Evans.",
    celebrate: "Whenever there's an event on my island in Animal Crossing.",
    watch:
      'An old favorite, 30 Rock, since I finally found a streaming platform to watch it on.',
    listen: "A playlist I've created on Soundcloud titled 'Headspace'.",
    learn:
      "All kinds of frontend magic. I've been knee-deep in a rewrite of our Spectacle documentation site for a week now... so much CSS!",
    work: "The above mentioned rewrite, now that we've shipped Spectacle v6. 🎉",
  },
  {
    date: '2020-01-05',
    location: 'At home in Denver, Colorado.',
    travel:
      "To Seattle, Washington next month for Formidable's annual all-hands event.",
    read: "'One Hundred Names for Love: A Memoir' by Diane Ackerman. A little lighter than my last, 'Edible Woman' by Margaret Atwood.",
    watch:
      'The Expanse (and it only took 2 years of other folks convincing me to give it a shot).',
    listen: 'A lot of Rainbow Kitten Surprise.',
    celebrate: 'The first anniversary of me breaking my right pinky. 🦴',
    learn:
      'Modern React practices and how to leverage hooks in enterprise applications.',
    work: 'Taking a more formulaic approach to new endeavors.',
  },
]

export function getAllNowPosts() {
  return sortByDateDesc(all)
}

export function getMostRecentNow() {
  return sortByDateDesc(all)[0]
}
