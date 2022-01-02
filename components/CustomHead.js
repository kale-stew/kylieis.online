import Head from 'next/head'
import { FacebookOpenGraph } from '@resoc/core'
import { METADATA } from '../utils/constants'

const CustomHead = (pageProps) => {
  const getPageUrl = () => {
    if (pageProps.baseName && pageProps.baseName.indexOf('post-') === 0) {
      return `https://${METADATA.SITE_NAME}/${pageProps.postData.category}/${pageProps.postData.id}`
    } else if (pageProps.baseName && pageProps.baseName === 'home') {
      return `https://${METADATA.SITE_NAME}`
    }
    return `https://${METADATA.SITE_NAME}/${pageProps.baseName}`
  }
  const description = pageProps.description
    ? pageProps.description
    : `${METADATA.NAME} is a web developer and public speaker creating content.`

  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kyliestew" />
      <meta name="twitter:title" content={pageProps.title} />
      <meta name="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`https://raw.githubusercontent.com/kale-stew/kyliestewart.tech/main/public/open-graph/${pageProps.ogImage}`}
      />

      <meta property="og:image" content={`/open-graph/${pageProps.ogImage}`} />
      <meta property="og:image:width" content={FacebookOpenGraph.width} />
      <meta property="og:image:height" content={FacebookOpenGraph.height} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getPageUrl()} />

      <meta property="og:title" content={pageProps.title} />
      <title>{`${pageProps.title} · ${METADATA.SITE_NAME}`}</title>

      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
    </Head>
  )
}

export default CustomHead
