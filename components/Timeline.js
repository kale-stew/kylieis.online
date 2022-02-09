import styled from '@emotion/styled'

const ItemDescription = styled.div`
  margin-left: 1.75rem;
  line-height: 2;
  font-size: 15px;
`

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 2fr;
  margin-bottom: 1rem;
`

const Timeline = ({ events }) => {
  const buildEventItem = ({
    jobTitle,
    location,
    company,
    companyUrl,
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
        {startDate} － {endDate}
      </div>
      <hr
        style={{
          height: '100%',
          borderRight: '1px solid var(--color-text-accent)',
        }}
      ></hr>
      <ItemDescription>{description}</ItemDescription>
    </TimelineItem>
  )

  return <>{events.map((event) => buildEventItem(event))}</>
}

export default Timeline
