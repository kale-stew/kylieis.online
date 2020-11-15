import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../layout'
import { Head } from '../components/head'
import WanderingOtis from './images/dune-otis.jpg'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Head title="404" />
        <h1>Oh No!</h1>
        <p>
          You've found the 404 page, either intentionally or accidentally, by
          hitting a route that doesn't exist.
        </p>
        <h2>Please allow Otis to guide you back home:</h2>
        <a href="https://kyliestewart.tech/blog">
          <img
            src={WanderingOtis}
            alt="A black dog walking off into the horizon"
          />
        </a>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
