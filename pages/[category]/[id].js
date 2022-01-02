import Category from '../../components/Category'
import FormattedDate from '../../components/Date'
import Layout from '../../components/Layout'
import Link from 'next/link'
import MarkdownHighlight from '../../components/MarkdownHighlight'
import ReactMarkdown from 'react-markdown'
import { METADATA } from '../../utils/constants'
import { getAllPostIds, getPostData } from '../../utils/posts'
import { socialImage } from '../../utils/preview-cards'

import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={`${utilStyles.lightText} ${utilStyles.singleRow}`}>
          <FormattedDate dateString={postData.date} withDOW />{' '}
          <Category category={postData.category} />
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
      <div className={utilStyles.backToHome}>
        <Link href="/blog">
          <a>← Back to blog</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.category, params.id)
  const title = postData.title
  const description = `${METADATA.NAME} is writing about Javascript, GraphQl, open source, and more.`

  return {
    props: {
      postData,
      ...(await socialImage({
        title,
        description,
        baseName: `post-${params.id}`,
      })),
    },
  }
}
