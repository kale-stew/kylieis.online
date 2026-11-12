// vite `?raw` imports resolve to the file's text
declare module '*.md?raw' {
  const content: string
  export default content
}
