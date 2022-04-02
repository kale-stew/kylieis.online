import styled from '@emotion/styled'

const StyledInput = styled.input`
  display: flex;
  width: 50%;
  margin: 3rem auto;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid var(--color-text-accent);
  background: var(--color-primary-bg);
  color: var(--color-primary-text);
  font-size: 2rem;
  font-style: italic;
  font-family: 'Fira Sans', sans-serif;
`

const SearchBar = () => {
  // search all content: notion projects, other projects, blog posts, talks
  return <StyledInput />
}

export default SearchBar
