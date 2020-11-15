import React from 'react'
import { graphql } from 'gatsby'

import { ThemeSwitch } from '../components/theme-switch'
import { Top } from '../components/top'
import { rhythm } from '../utils/typography'

export default ({ data }) => {
  const resumes = data.allMarkdownRemark.edges
  const resume = resumes.map(({ node }) => node)[0]

  return (
    <React.Fragment>
      <Top location={''} rootPath={'/'} />
      <div style={{ paddingRight: '2rem', paddingTop: '2rem' }}>
        <ThemeSwitch />
      </div>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: resume.html }} />
      </div>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
