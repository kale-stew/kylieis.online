import BlogItem from '../components/BlogItem'
import ContactForm from '../components/ContactForm'
import Layout from '../components/Layout'
import ProjectCard, { ProjectCarousel } from '../components/ProjectCard'
import styled from '@emotion/styled'
import { METADATA, SOCIAL_LINKS } from '../utils/data/personal-info'
import { captionStyles, IntroParagraph, PageDivider } from '../components/shared'
import { defaultSocialImage } from '../utils/preview-cards'
import { getNotionProjects } from '../utils/data/notion'
import { getPostDataByCategory } from '../utils/data/posts'

import utilStyles from '../styles/utils.module.css'

const SmallerSection = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  @media (max-width: 1024px) {
    max-width: 90vw;
  }
`

const BlogListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  list-style: none;
`

export default function NotionTemplatesPage({
  title,
  blogPostData,
  notionProjects,
}) {
  return (
    <Layout>
      <h1
        className={`${utilStyles.centerText} ${utilStyles.heading2Xl}`}
        style={{ marginTop: '3rem' }}
      >
        {title}
      </h1>

      <IntroParagraph className={utilStyles.centerText}>
        Notion is an all-in-one workspace for note-taking, knowledge and data
        management, and project and task management. As the first U.S.-based
        Notion Ambassador, I work with the company to beta test their programs
        and software while also organizing a community for fellow enthusiasts in
        the front range of Colorado,{' '}
        <a
          href="https://www.meetup.com/Notioners-of-Denver/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Denver Notioners
        </a>
        . The following are interviews, templates, blog posts, and other guides
        I've produced in my time working with Notion over the years.
      </IntroParagraph>

      <SmallerSection>
        <h2 className={utilStyles.headingXl}>Featured Projects</h2>
      </SmallerSection>
      <ProjectCarousel>
        {notionProjects.map((project) => (
          <ProjectCard item={project} category="notion" />
        ))}
      </ProjectCarousel>

      <SmallerSection>
        <h2 className={utilStyles.headingXl} style={{ marginTop: '3rem' }}>
          Blog Posts
        </h2>
        <BlogListWrapper>
          {blogPostData.map(
            (post) =>
              post && (
                <li key={post.id}>
                  <BlogItem item={post} />
                </li>
              )
          )}
        </BlogListWrapper>
      </SmallerSection>

      <PageDivider />
      <h2 className={`${utilStyles.centerText} ${utilStyles.headingXl}`}>
        📫 Get in Touch
      </h2>
      <p style={captionStyles}>
        To stay up to date with {METADATA.FIRST_NAME}'s work, follow her{' '}
        <a href={SOCIAL_LINKS.Twitter}>on Twitter</a>. To discuss working
        together, or to ask a question about any of these templates, send her{' '}
        <a href={SOCIAL_LINKS.Email}>an email</a> or use the following form:
      </p>
      <ContactForm />
    </Layout>
  )
}

export async function getStaticProps() {
  const blogPostData = await getPostDataByCategory('notion')
  const title = 'Notion Templates & Guides'
  const description = `${METADATA.FIRST_NAME} is a Notion Ambassador creating templates and guides.`
  const notionProjects = getNotionProjects()

  return {
    props: {
      blogPostData,
      title,
      description,
      notionProjects,
      ...(await defaultSocialImage({
        title,
        description,
        baseName: 'notion',
      })),
    },
  }
}
