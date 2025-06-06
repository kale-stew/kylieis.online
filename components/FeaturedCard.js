import FormattedDate from './Date'
import Link from 'next/link'
import ReactCardFlip from 'react-card-flip'
import styled from '@emotion/styled'
import { accordion, mobileAccordion } from '../styles/animations'
import { formatDate } from '../utils/helpers'
import { parseISO } from 'date-fns'
import { useState } from 'react'

const AccordionCard = styled.div`
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px var(--color-bg-secondary);
  border-collapse: collapse;
  border-radius: 0.75rem;
  box-shadow: ${(props) => `var(--color-${props.color}-1) -5px 5px,
    var(--color-${props.color}-2) -10px 10px,
    var(--color-${props.color}-3) -15px 15px,
    var(--color-${props.color}-4) -20px 20px;`};

  p {
    max-width: ${(props) => (props.featured ? '70%' : 'auto')};
    margin: 1rem auto;
    font-family: 'Arsenal', sans-serif;
  }

  &:hover {
    cursor: pointer;
    animation: ${(props) => accordion(props.color)} 0.5s ease-in-out;
    animation-fill-mode: both;
  }

  @media (max-width: 710px) {
    box-shadow: ${(props) => `var(--color-${props.color}-1) 0px 5px,
      var(--color-${props.color}-2) 0px 10px,
      var(--color-${props.color}-3) 0px 15px,
      var(--color-${props.color}-4) 0px 20px`};
    &:hover {
      animation: ${(props) => mobileAccordion(props.color)} 0.5s ease-in-out;
    }
  }
`

const TitleLink = styled.h2`
  a {
    color: var(--color-text-primary);
    &:hover {
      text-decoration: underline;
      box-shadow: none;
    }
  }
`

const EventItem = styled.div`
  margin: 1rem 0;
  a {
    color: var(--color-text-accent);
    &:hover {
      text-decoration: underline;
    }
  }
`

const FlipButton = styled.button`
  background-color: var(--color-bg-secondary);
  color: var(--color-red);
  padding: 0.25em;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 -2em 0 0 var(--color-red);
    color: var(--color-bg-primary);
    font-weight: 800;
  }
`

const FeaturedCard = ({ color = 'red', flippable, item }) => {
  const [isFlipped, setFlip] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    setFlip(!isFlipped)
  }

  const FlipOver = () => (
    <FlipButton onClick={handleClick}>Flip over</FlipButton>
  )

  const buildEvent = (item) => (
    <EventItem>
      → <a href={item.eventUrl}>{item.eventName}</a>{' '}
      {item.location !== 'virtual'
        ? `in ${item.location} on ${formatDate(parseISO(item.eventDate))}.`
        : `online on ${formatDate(parseISO(item.eventDate))}.`}
    </EventItem>
  )

  const speakingPadding = { padding: '0.7rem 1.5rem 1rem 1.5rem' }
  const homePagePadding = { padding: '0.5rem' }

  return flippable ? (
    <ReactCardFlip isFlipped={isFlipped} infinite>
      <AccordionCard color={color} style={speakingPadding}>
        {
          <TitleLink>
            <Link
              href="/[category]/[id]"
              as={`/${item.type === 'blog' ? item.category : 'speaking'}/${
                item.id
              }`}
              alt={`Read the full ''${item.title}' post.'`}
            >
              {item.title}
            </Link>
          </TitleLink>
        }
        {item.date && <FormattedDate dateString={item.date} />}
        <p>{item.description}</p>
        <FlipOver />
      </AccordionCard>

      <AccordionCard color={color} style={speakingPadding}>
        <>
          <h3>Presented At</h3>
          {item.presentedAt.map((item) => item.eventDate && buildEvent(item))}
        </>
        <FlipOver />
      </AccordionCard>
    </ReactCardFlip>
  ) : (
    <AccordionCard featured color={color} style={homePagePadding}>
      {
        <TitleLink>
          <Link
            href="/[category]/[id]"
            as={`/${item.type === 'blog' ? item.category : 'speaking'}/${
              item.id
            }`}
            alt={`Read the full ''${item.title}' post.'`}
          >
            {item.title}
          </Link>
        </TitleLink>
      }
      {item.date && (
        <small>
          <FormattedDate dateString={item.date} />
        </small>
      )}
      <p>{item.description}</p>
    </AccordionCard>
  )
}

export default FeaturedCard
