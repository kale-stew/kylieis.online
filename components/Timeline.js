import styled from '@emotion/styled'

const ItemDescription = styled.div`
  margin-left: 1.75rem;
  line-height: 1.7;
  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 2fr;
  margin-bottom: 1rem;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }
`

const TimelineDivider = styled.hr`
  height: 100%;
  border: 2px solid var(--color-text-accent);
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const Timeline = ({ events }) => {
  const buildEventItem = ({
    jobTitle,
    location,
    company,
    startDate,
    endDate,
    description,
  }) => (
    <TimelineItem key={jobTitle}>
      <div className="timeline-item-title">
        <strong>{`${jobTitle} @ ${company}`}</strong>
        <br />
        📍 {location}
        <br />
        {startDate}
        {endDate && `－${endDate}`}
      </div>
      <TimelineDivider />
      <ItemDescription>{description}</ItemDescription>
    </TimelineItem>
  )

  return <>{events.map((event) => buildEventItem(event))}</>
}

export default Timeline
