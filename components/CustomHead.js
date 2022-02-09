import Head from 'next/head'
import { FacebookOpenGraph } from '@resoc/core'
import { METADATA } from '../utils/data/personal-info'

const CustomHead = (pageProps) => {
  const getPageTitle = () =>
    pageProps.title === METADATA.SITE_NAME
      ? `${METADATA.FULL_NAME} · software engineer, speaker, creator`
      : `${pageProps.title} · ${METADATA.SITE_NAME}`

  const getPageDescription = () =>
    pageProps.description
      ? pageProps.description
      : `${METADATA.FIRST_NAME} is a web developer and public speaker creating content.`

  const getPageUrl = () => {
    if (pageProps.baseName && pageProps.baseName.indexOf('post-') === 0) {
      return `https://${METADATA.SITE_NAME}/${pageProps.postData.category}/${pageProps.postData.id}`
    } else if (pageProps.baseName && pageProps.baseName === 'home') {
      return `https://${METADATA.SITE_NAME}`
    }
    return `https://${METADATA.SITE_NAME}/${pageProps.baseName}`
  }

  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kyliestew" />
      <meta name="twitter:title" content={getPageTitle()} />
      <meta name="twitter:description" content={getPageDescription()} />
      <meta
        property="twitter:image"
        content={`https://raw.githubusercontent.com/kale-stew/kyliestewart.tech/main/public/open-graph/${pageProps.ogImage}`}
      />

      <meta property="og:image" content={`/open-graph/${pageProps.ogImage}`} />
      <meta property="og:image:width" content={FacebookOpenGraph.width} />
      <meta property="og:image:height" content={FacebookOpenGraph.height} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getPageUrl()} />

      <meta property="og:title" content={getPageTitle()} />
      <title>{getPageTitle()}</title>

      <meta property="og:description" content={getPageDescription()} />
      <meta name="description" content={getPageDescription()} />
    </Head>
  )
}

export default CustomHead
