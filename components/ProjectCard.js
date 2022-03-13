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
  max-width: 25rem;
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

const ProjectTypePill = styled.div`
  vertical-align: center;
  width: max-content;
  height: max-content;
  padding: 2px 4px;
  font-size: 10px;
  font-weight: 500;
  margin-left: 8px;
  border-radius: 10px;
  color: white;
  background-color: ${(p) =>
    p.type === 'video' ? `var(--color-pink)` : `var(--color-purple)`};
`

const ProjectCard = ({ item }) => (
  <Wrapper>
    <ProjectPreview
      src={item.previewImgUrl}
      alt={`Preview image ${
        item.type === 'video' ? 'of the video thumbnail for' : 'of the template'
      } '${item.title}'.`}
    />
    <ProjectTitle>
      <a
        href={item.url}
        target="_blank"
        alt="Go to the full summary where you can duplicate this Project."
      >
        {item.title}
      </a>
      <ProjectTypePill type={item.type}>{item.type}</ProjectTypePill>
    </ProjectTitle>
    <span>{item.description}</span>
  </Wrapper>
)

export default ProjectCard
