import React from 'react'

import './index.scss'

export const ProjectCard = ({ item }) => (
  <div className="card">
    <h3 className="card-title">{item.title}</h3>
    <div className="card-subtitle">{item.subtitle}</div>
    <a className="card-link" href={item.link}>
      Go to ↗
    </a>
  </div>
)
