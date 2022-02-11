import Link from 'next/link'
import styled from '@emotion/styled'
import { accordion } from '../styles/animations'

const BlogNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin-top: 2rem;
`

const NavigationButton = styled.span`
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  background-color: ${(props) => `var(--color-${props.color}-0)`};
  border-radius: 5px;
  box-shadow: ${(props) =>
    `var(--color-${props.color}-1) -5px 5px, var(--color-${props.color}-2) -10px 10px;`};
  &:hover {
    cursor: pointer;
    animation: ${(props) => accordion(props.color)} 0.5s ease-in-out;
    animation-iteration-count: 2;
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

  // If previous post exists,
  if (selfPosition + 1 <= postIds.length - 1) {
    nextPost = selfPosition + 1
    nextPostLink = (
      <Link
        href="/[category]/[id]"
        as={`/${
          postIds[nextPost].type === 'blog'
            ? postIds[nextPost].category
            : 'speaking'
        }/${postIds[nextPost].id}`}
      >
        <NavigationButton
          color={postIds[nextPost].type === 'blog' ? 'purple' : 'pink'}
          style={{ textAlign: 'right' }}
        >
          {postIds[nextPost].title} →
        </NavigationButton>
      </Link>
    )
  }
  // If next post exists,
  if (selfPosition - 1 >= 0) {
    prevPost = selfPosition - 1
    prevPostLink = (
      <Link
        href="/[category]/[id]"
        as={`/${
          postIds[prevPost].type === 'blog'
            ? postIds[prevPost].category
            : 'speaking'
        }/${postIds[prevPost].id}`}
      >
        <NavigationButton
          color={postIds[prevPost].type === 'blog' ? 'purple' : 'pink'}
        >
          ← {postIds[prevPost].title}
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
          <NavigationButton color={currentlyOnBlog ? 'purple' : 'pink'}>
            ← Back to {currentlyOnBlog ? 'blog' : 'all talks'}
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
          <NavigationButton
            color={currentlyOnBlog ? 'purple' : 'pink'}
            style={{ textAlign: 'right' }}
          >
            {' '}
            Back to {currentlyOnBlog ? 'blog' : 'all talks'} →
          </NavigationButton>
        </Link>
      </BlogNavigation>
    )
  }

  return (
    <BlogNavigation>
      <Link href="/blog">
        <NavigationButton color="purple">← Back to blog</NavigationButton>
      </Link>
    </BlogNavigation>
  )
}
