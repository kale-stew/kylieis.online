import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const Intro = () => (
  <StaticQuery
    query={introQuery}
    render={(data) => {
      const { author } = data.site.siteMetadata

      return (
        <div className="intro">
          <Image
            className="intro-image"
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              borderRadius: `100%`,
            }}
          />
          <div>
            👋 Hi, I'm <b>Kylie Stewart</b>, a Software Engineer based in
            Denver, Colorado.
          </div>
          <div>
            👩‍💻 I currently work at a Javascript consultancy named{' '}
            <b>Formidable</b>.
          </div>
          <div>🏔️ When I'm not working, I like to hike with my dog, Otis.</div>
        </div>
      )
    }}
  />
)

const introQuery = graphql`
  query IntroQuery {
    avatar: file(absolutePath: { regex: "/headshot.png/" }) {
      childImageSharp {
        fixed(width: 220, height: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
      }
    }
  }
`

export default Intro
