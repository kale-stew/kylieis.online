---
title: 'Anything but JavaScript'
date: '2019-05-21'
category: 'typescript'
description: 'A whirlwind intro to three ways of stepping outside plain JavaScript: TypeScript, ReasonML, and machine learning.'
presentedAt:
  - eventDate: '2019-05-21'
    eventName: 'Galvanize Platte'
    eventType: 'cohort talk'
    location: 'Denver, CO'
---

I presented this to a cohort at Galvanize's Platte campus in Denver: a quick tour of three ways to step outside plain JavaScript, and how to get started with each.

## TypeScript

TypeScript is a superset of JavaScript that adds optional static type checking. It's designed for large-scale, robust applications, while still compiling down to plain JavaScript.

The easiest way to see the difference is a React button. In JavaScript, you have to go digging through `defaultProps` to figure out which props the component expects:

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
```

In TypeScript, the interface tells you up front:

```tsx
interface IButtonProps {
  href: string
  disabled?: boolean
  large?: boolean
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
```

I go deeper on this in [How TypeScript Made Me a Better JS Developer](/speaking/ts-in-react).

## ReasonML

ReasonML is a statically typed, functional language based on OCaml that compiles to JavaScript. From OCaml it inherits static types, pattern matching, and a functional style: separate your concerns, avoid mutable objects, and limit side effects.

Here's the same logic in both languages. In JavaScript, a `switch` on strings:

```js
const getAnswer = (review, message) => {
  switch (review) {
    case 'Bad':
      return 'That is sad that you think: ' + message
    case 'Neutral':
      return 'Okay'
    case 'Awesome':
      return 'Yes yes yes!'
  }
}
```

In Reason, the possible reviews are a type, and the compiler makes sure you handle every one:

```reason
type review =
  | Bad(string)
  | Neutral
  | Awesome;

let getAnswer = review =>
  switch (review) {
  | Bad(comment) => "That is sad that you think: " ++ comment
  | Neutral => "Okay"
  | Awesome => "Yes yes yes!"
  };
```

_(2026 note: most of the Reason-to-JavaScript community has since moved to [ReScript](https://rescript-lang.org), its successor.)_

## Machine Learning

The last section is a crash course: what machine learning actually is (think function notation), and the difference between supervised learning (humans label the data; think linear regression and classification) and unsupervised learning (great for big data, exploratory analysis, anomaly detection, and clustering). I cover this in more depth in [Teaching Machines How to Do Cool Things with JavaScript](/speaking/machine-learning-with-javascript).

## Resources

- TypeScript: [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/), the [TypeScript playground](https://www.typescriptlang.org/play), and [TypeScript Fundamentals](https://typescriptcourses.com/typescript-fundamentals)
- ReasonML: [What and why](https://reasonml.github.io/docs/en/what-and-why) and Jared Forsyth's [ReasonReact tutorial](https://jaredforsyth.com/posts/a-reason-react-tutorial/)
- Machine learning: [Brain.js](https://github.com/BrainJS/brain.js), [TensorFlow.js examples](https://github.com/tensorflow/tfjs-examples), and [Botnik](https://botnik.org/)

## Slides

- [Live slides](https://kale-stew.github.io/anything-but-js)
- [Exported PDF](https://github.com/kale-stew/all-talks/blob/main/content/2019/anything-but-js/final.pdf)

Thank you for having me, Galvanize!
