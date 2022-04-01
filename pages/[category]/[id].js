import Category from '../../components/Category'
import FormattedDate from '../../components/Date'
import Layout from '../../components/Layout'
import MarkdownHighlight from '../../components/MarkdownHighlight'
import ReactMarkdown from 'react-markdown'
import { METADATA } from '../../utils/data/personal-info'
import { blogSocialImage } from '../../utils/preview-cards'
import { buildNavigation } from '../../components/BlogNavigation'
import { getAllPostData, getAllPostIds } from '../../utils/data/posts'
import { getBlogPostData } from '../../utils/data/writing'
import { getSingleTalkData } from '../../utils/data/speaking'

import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData, postIds }) {
  return (
    <Layout>
      <article>
        <h1
          className={`${utilStyles.heading2Xl} ${utilStyles.centerText}`}
          style={{ marginTop: '3rem' }}
        >
          {postData.title}
        </h1>
        <div
          className={`${utilStyles.lightText} ${utilStyles.singleRow}`}
          style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FormattedDate dateString={postData.date} withDOW />{' '}
          {postData.category.includes('speaking') ? (
            postData.category.map((category) => (
              <Category category={category} />
            ))
          ) : (
            <Category category={postData.category} />
          )}
        </div>

        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <MarkdownHighlight
                  value={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {postData.content}
        </ReactMarkdown>
      </article>

      {buildNavigation(postIds, postData)}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData =
    params.category === 'speaking'
      ? await getSingleTalkData(params.id)
      : await getBlogPostData(params.category, params.id)
  const title = postData.title
  const description = `${METADATA.FIRST_NAME} is writing about Javascript, GraphQl, open source, and more.`
  const postIds = await getAllPostData()

  return {
    props: {
      postData,
      postIds,
      ...(await blogSocialImage({
        title,
        description,
        baseName: `post-${params.id}`,
      })),
    },
  }
}
