import styled from '@emotion/styled'
import Link from 'next/link'

export const ProjectCarousel = styled.div`
  max-height: auto;
  width: 55vw;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  padding: 1rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 60vw;
  }
`

const ProjectPreview = styled.img`
  width: 25rem;
  max-height: 12rem;
  object-fit: cover;
`

const ProjectTitle = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  a:hover {
    text-decoration: underline;
  }
`

const Wrapper = styled.div`
  max-width: 30rem;
  margin: 1em;
`

const determinePillColor = (str) => {
  switch (str) {
    case 'next.js':
      return '#333333'
    case 'node':
      return '#539e43'
    case 'react':
      return '#61dafb'
    case 'video':
      return 'var(--color-orange)'
    default:
      return 'var(--color-red)'
  }
}

const ProjectPill = styled.div`
  vertical-align: center;
  width: max-content;
  height: max-content;
  padding: 2px 4px;
  font-size: 10px;
  font-weight: 500;
  margin-left: 8px;
  border-radius: 0.3rem;
  color: white;
  background-color: ${(p) => determinePillColor(p.type)};
`

const ExternalLink = ({ item }) => (
  <a
    href={item.url}
    target="_blank"
    alt={`Go to ${item.title}'s landing page.`}
  >
    {item.title}
  </a>
)

const InternalLink = ({ item }) => (
  <Link href={item.url} alt={`Go to the ${item.title} project page.`}>
    {item.title}
  </Link>
)

const ProjectCard = ({ item, category }) => {
  const imageDescription = `Preview image ${
    category === 'notion' && item.type === 'video'
      ? 'of the video thumbnail for'
      : category === 'notion'
      ? 'of the template'
      : null
  } '${item.title}'.`

  return (
    <Wrapper>
      <ProjectPreview src={item.previewImgUrl} alt={imageDescription} />
      <ProjectTitle>
        {item.url.startsWith('/') ? (
          <InternalLink item={item} />
        ) : (
          <ExternalLink item={item} />
        )}
        {item.tech ? (
          item.tech.map((str) => <ProjectPill type={str}>{str}</ProjectPill>)
        ) : (
          <ProjectPill type={item.type}>{item.type}</ProjectPill>
        )}
      </ProjectTitle>
      <span>{item.description}</span>
    </Wrapper>
  )
}

export default ProjectCard
