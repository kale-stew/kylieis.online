import Link from 'next/link'
import styled from '@emotion/styled'
import { miniAccordion } from '../styles/animations'
import utilStyles from '../styles/utils.module.css'

const BackToAll = ({ currentlyOnBlog }) => (
  <span className={utilStyles.hideInMobile}>
    Back to {currentlyOnBlog ? 'blog' : 'all talks'}
  </span>
)

const BlogNavigation = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`

const NavigationButton = styled.span`
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  background-color: var(--color-orange-0);
  border-radius: 0.3rem;
  box-shadow: var(--color-orange-1) -5px 5px, var(--color-orange-2) -10px 10px;
  &:hover {
    cursor: pointer;
    animation: ${miniAccordion('orange')} 0.5s ease-in-out;
  }
`

const NavigationDivider = styled.hr`
  border: 1px solid transparent;
  margin: 0 2vw;
  width: auto;
`

/**
 * buildNavigation uses the sorted posts data to find it's own index, the next post's,
 * and the previous post's index (if they exist). Now that it knows where it is in the
 * sorted data, we can generate the nav links for the bottom of the page.
 * @returns next js <Link/>
 */
export const buildNavigation = (postIds, postData) => {
  const selfPosition = postIds.findIndex((post) => post.id === postData.id)
  const currentlyOnBlog = postIds[selfPosition].type === 'blog'
  let nextPost = -1
  let prevPost = -1
  let nextPostLink
  let prevPostLink

  // If next post exists,
  if (selfPosition + 1 <= postIds.length - 1) {
    nextPost = selfPosition + 1
    nextPostLink = (
      <Link
        href="/[category]/[id]"
        as={`/${postIds[nextPost].type === 'blog'
            ? postIds[nextPost].category
            : 'speaking'
          }/${postIds[nextPost].id}`}
      >
        <NavigationButton dir="right">
          <span className={utilStyles.hideInMobile}>
            {postIds[nextPost].title}
          </span>
          →
        </NavigationButton>
      </Link>
    )
  }
  // If previous post exists,
  if (selfPosition - 1 >= 0) {
    prevPost = selfPosition - 1
    prevPostLink = (
      <Link
        href="/[category]/[id]"
        as={`/${postIds[prevPost].type === 'blog'
            ? postIds[prevPost].category
            : 'speaking'
          }/${postIds[prevPost].id}`}
      >
        <NavigationButton>
          ←
          <span className={utilStyles.hideInMobile}>
            {postIds[prevPost].title}
          </span>
        </NavigationButton>
      </Link>
    )
  }

  // If posts exist on both sides
  if (nextPost != -1 && prevPost != -1) {
    return (
      <BlogNavigation>
        {prevPostLink}
        <NavigationDivider></NavigationDivider>
        {nextPostLink}
      </BlogNavigation>
    )
  }

  // If there is no previous post, go back to all
  if (prevPost == -1 && nextPost != -1) {
    return (
      <BlogNavigation>
        <Link href={`/${currentlyOnBlog ? 'writing' : 'speaking'}`}>
          <NavigationButton>
            ← <BackToAll currentlyOnBlog />
          </NavigationButton>
        </Link>
        <NavigationDivider></NavigationDivider>
        {nextPostLink}
      </BlogNavigation>
    )
  }
  // If there is no next post, go back to all
  if (nextPost == -1 && prevPost != -1) {
    return (
      <BlogNavigation>
        {prevPostLink}
        <NavigationDivider></NavigationDivider>
        <Link href={`/${currentlyOnBlog ? 'writing' : 'speaking'}`}>
          <NavigationButton dir="right">
            {' '}
            <BackToAll currentlyOnBlog /> →
          </NavigationButton>
        </Link>
      </BlogNavigation>
    )
  }

  return (
    <BlogNavigation>
      <Link href="/blog">
        <NavigationButton>← Back to blog</NavigationButton>
      </Link>
    </BlogNavigation>
  )
}
