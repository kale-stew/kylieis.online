import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { synthwave84 } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const MarkdownHighlight = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={synthwave84}>
    {value}
  </SyntaxHighlighter>
)

export default MarkdownHighlight
