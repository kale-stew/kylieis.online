import styled from '@emotion/styled'

export const ProjectCarousel = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  max-height: auto;
  padding-bottom: 2rem;
  @media (max-width: 1024px) {
    max-width: 90vw;
  }
`

const Wrapper = styled.div`
  max-width: 30rem;
  margin: 1em;
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

const determinePillColor = (str) => {
  switch (str) {
    case 'next.js':
      return '#333333'
    case 'node':
      return '#539e43'
    case 'react':
      return '#61dafb'
    case 'video':
      return 'var(--color-pink)'
    default:
      return 'var(--color-purple)'
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
  border-radius: 10px;
  color: white;
  background-color: ${(p) => determinePillColor(p.type)};
`

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
        <a
          href={item.url}
          target="_blank"
          alt={`Go to ${item.title}'s landing page.`}
        >
          {item.title}
        </a>
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
