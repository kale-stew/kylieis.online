import Category from '../../components/Category'
import FormattedDate from '../../components/Date'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Link from 'next/link'
import MarkdownHighlight from '../../components/MarkdownHighlight'
import ReactMarkdown from 'react-markdown'
import { getAllPostIds, getPostData } from '../../utils/posts'

import utilStyles from '../../styles/utils.module.css'

const Post = ({ postData }) => (
  <Layout>
    <Head>
      <title>{postData.title} | kylies.photos</title>
    </Head>
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

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.category, params.id)

  return {
    props: {
      postData,
    },
  }
}

export default Post
