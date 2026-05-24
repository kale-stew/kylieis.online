---
title: 'TypeScript + React: A Love Story'
date: '2019-04-16'
category: 'typescript'
description: 'How TypeScript made me a better JavaScript developer, and best practices for using TypeScript with React.'
presentedAt:
  - eventDate: '2019-04-16'
    eventName: 'React Denver'
    eventType: 'meetup'
    eventUrl: 'https://www.meetup.com/ReactDenver/events/kgrmmqyzgbvb/'
    recordedPresentationUrl: 'https://youtu.be/iBlGIS-UQsw?t=1638'
    location: 'Denver, CO'
  - eventDate: '2018-10-25'
    eventName: 'Formidable Denver Open House'
    eventType: 'meetup'
    eventUrl: 'https://formidable-denver.eventbrite.com'
    location: 'Denver, CO'
---

TypeScript and React are a perfect match. This talk explores why, and shares practical patterns for getting the most out of both.

## Why TypeScript?

- **Catch errors at compile time** - Not in production
- **Better IDE support** - Autocomplete, refactoring, go-to-definition
- **Self-documenting code** - Types are documentation that can't go stale
- **Confidence in refactoring** - Change code without fear

## TypeScript + React Patterns

### Typing Props

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={variant} onClick={onClick}>{label}</button>
}
```

### Typing Hooks

```typescript
const [count, setCount] = useState<number>(0)
const inputRef = useRef<HTMLInputElement>(null)
```

### Generic Components

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>
}
```

## The Journey

The talk shares my personal journey from JavaScript skeptic to TypeScript advocate, and the "aha moments" along the way.
