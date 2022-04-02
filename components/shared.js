import styled from '@emotion/styled'

export const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '0.9rem',
  fontFamily: "'Fira Sans', sans-serif",
  textAlign: 'center',
  maxWidth: '80%',
}

export const IntroParagraph = styled.p`
  max-width: 50vw;
  margin: 0 auto 3rem auto;
  @media (max-width: 1024px) {
    max-width: 80vw;
  }
`

export const PageDivider = styled.hr`
  height: 1.5px;
  width: 100%;
  border: none;
  margin: 3rem 0 2.5rem 0;
  color: var(--color-text-accent);
  background-color: var(--color-text-accent);
`

export const StyledLink = styled.a`
  color: var(--color-text-accent);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    text-decoration: underline;
  }
`
