---
title: 'How TypeScript made me a better JS developer'
date: '2019-04-16'
category: 'typescript'
description: 'What working in React + TypeScript codebases as an embedded consultant taught me about writing better JavaScript.'
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

Working as an embedded consultant, I've walked into plenty of repositories in various stages of development. After almost two years of that, I've found that I prefer working in React applications that are also written in TypeScript, and that working in that stack has made me a better JavaScript developer in a few specific ways.

TypeScript is a superset of JavaScript, so it shares a lot with the language it's built on, with one big difference: it's statically typed, so your code is checked at compile time. JavaScript is dynamically typed and figures out types at runtime, which is a big part of the "fast and loose" reputation developers like to complain about.

## Comparing the Syntax

Here's the same React button in both languages:

```jsx
class Button extends Component {
  render() {
    return <button {...this.props}>{this.props.children}</button>
  }
}

Button.defaultProps = {
  href: '',
  disabled: false,
}

export default Button
```

In the JavaScript version, it isn't clear which props the button actually needs until you go digging through `defaultProps`.

```tsx
interface IButtonProps {
  href: string
  disabled?: boolean
  size?: string
}

class Button extends React.Component<IButtonProps> {
  public static defaultProps: Partial<IButtonProps> = {
    href: '',
    disabled: false,
  }

  public render() {
    return <button {...this.props}>{this.props.children}</button>
  }
}

export default Button
```

In the TypeScript version, the interface tells you exactly which props are accepted, and comparing it to `defaultProps` tells you which ones you're required to pass.

## How It Made Me Better

I framed the talk around three claims:

- 📦 TypeScript helps you create more portable code
- 📓 it helps you write better documentation
- 📈 it increases your dev speed

### Better component APIs

Because every prop has a declared type, you're forced to think through a component's API before you build it. That tends to produce better-structured components, and it makes the codebase document itself as you go. Similar to how test-driven development changes a team's mindset, a documentation-first mindset helps everyone move between corners of a codebase faster.

### PropTypes vs. interfaces

React's `propTypes` are the closest thing plain React has to interfaces: they let you describe prop types and shapes. But they aren't enforced at compile time the way TypeScript is, and while `propTypes` can be reused, interfaces can be *extended*.

### Composing props with HOCs

Higher order components are a common pattern in React + TypeScript codebases. When you find yourself repeating the same props across components, an HOC can provide the shared data, and its props interface can be extended by the components it wraps:

```tsx
interface IWithUserDataProps {
  id: number
  age: number
  firstName: string
  lastName: string
  nickname?: string
}

interface IGreetingProps extends IWithUserDataProps {
  message: string
}
```

### Unions and enums

Union types let a single prop accept more than one type. Here, `message` can be a single string or an array of strings:

```tsx
interface IButtonProps {
  href: string
  disabled?: boolean
  message?: string | string[]
}
```

Enums are handy when there's a fixed set of possible values:

```tsx
enum ButtonSize {
  Small,  // 0
  Medium, // 1
  Large,  // 2
}

interface IButtonProps {
  href: string
  disabled?: boolean
  size?: ButtonSize
}
```

### And the dev speed claim?

By the end, portable code and better documentation were easy to check off. Dev speed is the one people push back on, since you're writing more code up front. My case for it: TypeScript reads third-party declaration files for you, gives you cleaner errors, and makes refactoring far less scary.

## Cross-Experience Collaboration

Beyond being an excellent form of autocomplete, I've found TypeScript to be a nice bridge between engineers with different backgrounds. Folks coming from strongly typed languages get the safety they're used to, and engineers with deeper JavaScript experience can still contribute to the same codebase.

A React + TypeScript codebase can be one of the simplest to onboard to, especially with good tooling. Two of my favorites for this stack:

- [Storybook](https://storybook.js.org), for building and documenting UI components in isolation
- [React-Redux](https://redux.js.org/usage/usage-with-typescript), whose types make it much easier to work with Redux across a larger stack

## Further Reading

- [TypeScript Fundamentals](https://typescriptcourses.com/typescript-fundamentals)
- The official [TypeScript playground](https://www.typescriptlang.org/play), to try the syntax without setting up a project
- Basarat Ali Syed's [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/), which I still keep bookmarked

## Slides

- [Live slides](https://kale-stew.github.io/ts-in-react/)
- [Exported PDF](https://github.com/kale-stew/ts-in-react/blob/master/final.pdf)
