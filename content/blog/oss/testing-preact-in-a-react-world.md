---
title: 'Testing Preact in a React-Focused Codebase'
date: '2020-05-03'
---

So, today I had to write tests for an open-sourced library that is meant to compare deeply nested objects in the context of React, called [`react-fast-compare`](https://github.com/FormidableLabs/react-fast-compare). Essentially, we introduced support for Preact and needed to mirror existing tests written for React components to extend over Preact-compiled components.

In order to better understand this feature (and given that I had no prior experience with Preact), I had to learn what Preact actually is and how it differs from React. This wasn't difficult, as the docs themselves have a versioned "Differences to React" on their [documentation website](https://preactjs.com/guide/v10/differences-to-react). TL; DR: Preact is not meant to be a one-for-one replacement of React because it's so focused on being small. @TODO more

So, now understanding the difference between these frameworks, I had to compare testing libraries. We were using [`react-test-renderer`](https://reactjs.org/docs/test-renderer.html) to test a simple React component that was a h1 with a circular reference to its owner, Container, another React component. There's no equal replacement for testing Preact just yet, so I had to look at a few different libraries to get what I was looking for.

The objective: Test a similarly recursive component within a Container that has been compiled with React.

Our options:

1. [`preact-render-to-string`]() in combination with [`html-looks-like`]()
2. [`preact-jsx-chai`]()
3. [`preact-testing-libary`]()

Each of the above libraries serves a specific purpose and provides a different output that we can then validate using `sinon` and `assert` (the already-preferred testing libraries being used in the same file).

Let's look at what the existing tests are doing to better understand what we're trying to duplicate:

Facebook's own `react-test-renderer`, according to [its docs](https://reactjs.org/docs/test-renderer.html), "provides an individual React renderer that can be used to test pure JavaScript objects without depending on the DOm or a native mobile environment."

So, to test our React components, we've been using this package to look at the platform view hierarchy (meant to mimick the DOM tree) rendered by React. We'll do the same to test them in Preact, we just need to find a Preact test renderer that suits our needs.

Given these test components...

```js
// component
class ChildWithShouldComponentUpdate extends React.Component {
  shouldComponentUpdate(nextProps) {
    // this.props.children is a h1 with a circular reference to its owner, Container
    return !equal(this.props, nextProps)
  }
  render() {
    return null
  }
}

// container component
class Container extends React.Component {
  render() {
    return React.createElement(ChildWithShouldComponentUpdate, {
      children: [
        React.createElement('h1', this.props.title || ''),
        React.createElement('h2', this.props.subtitle || ''),
      ],
    })
  }
}
```

... combined with these three existing assertions:

```js
// test setup
let sandbox
let warnStub
let childRenderSpy

beforeEach(() => {
  sandbox = sinon.createSandbox()
  warnStub = sandbox.stub(console, 'warn')
  childRenderSpy = sandbox.spy(
    ChildWithShouldComponentUpdate.prototype,
    'render'
  )
})

afterEach(() => {
  sandbox.restore()
})

// test 1
it('compares without warning or errors', () => {
  const testRenderer = ReactTestRenderer.create(React.createElement(Container))
  testRenderer.update(React.createElement(Container))
  assert.strictEqual(warnStub.callCount, 0)
})

// test 2
it('elements of same type and props are equal', () => {
  const testRenderer = ReactTestRenderer.create(React.createElement(Container))
  testRenderer.update(React.createElement(Container))
  assert.strictEqual(childRenderSpy.callCount, 1)
})

// test 3
it('elements of same type with different props are not equal', () => {
  const testRenderer = ReactTestRenderer.create(React.createElement(Container))
  testRenderer.update(React.createElement(Container, { title: 'New' }))
  assert.strictEqual(childRenderSpy.callCount, 2)
})
```

We can rewrite these assertions and the `beforeEach` case to render these same components with Preact and validating the same `h1` and `h2` elements are making it to the so-called DOM. Our validation library, `assert`, can compare two objects, so let's try to find a renderer that will return an object for us to assert against.

<!-- What library renders to obj? -->

<!-- Can we duplicate the assertions? -->

<!-- Outcome / Final Tests -->

---

Check out the PR [on Github](https://github.com/FormidableLabs/react-fast-compare/pull/67).
