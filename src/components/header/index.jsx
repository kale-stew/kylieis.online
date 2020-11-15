import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

const BlogHeader = ({ title }) => (
  <h1 className="blog-header">
    <Link to={`/`} className="link">
      {title}
    </Link>
  </h1>
)

export const Header = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return isRoot && <BlogHeader title={title} />
}
