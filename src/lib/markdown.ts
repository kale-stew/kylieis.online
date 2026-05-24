import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : undefined
      return language
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value
    },
  })
)

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string
}
