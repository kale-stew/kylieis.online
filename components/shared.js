import styled from '@emotion/styled'

export const captionStyles = {
  margin: '0 auto 1rem auto',
  fontSize: '0.9rem',
  fontFamily: "'Arsenal', sans-serif",
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
  margin: 2.5rem 0 2rem 0;
  color: var(--color-text-accent);
  background-color: var(--color-text-accent);
`

export const StyledButton = styled.button`
  cursor: pointer;
  border: 2px solid var(--color-text-accent);
  border-radius: 0.3rem;
  color: white;
  font-size: 0.75rem;
  background: transparent;
  transition: background 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  margin: 0 auto;
  padding: 0.4em;
  width: max-content;
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const StyledLink = styled.a`
  color: ${(p) =>
    p.color ? `var(--color-${p.color})` : 'var(--color-text-accent)'};
  display: flex;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    text-decoration: underline;
  }
`
