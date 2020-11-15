import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Top = ({ location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          ←
        </Link>
      )}
    </div>
  )
}
