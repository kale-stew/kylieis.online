/**
 * now:new: add an entry to the /now page.
 *
 *   npm run now:new
 *
 * Prompts for each field (leave blank to skip) and prepends the entry to
 * content/now.json, the source of truth seeded into D1 on deploy.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const NOW_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'now.json')

const FIELDS = [
  ['location', 'Where are you?'],
  ['work', 'Working on'],
  ['read', 'Reading'],
  ['learn', 'Learning'],
  ['watch', 'Watching'],
  ['listen', 'Listening to'],
  ['travel', 'Travel'],
  ['celebrate', 'Celebrating'],
]

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const entries = JSON.parse(readFileSync(NOW_PATH, 'utf8'))
const rl = createInterface({ input: stdin, output: stdout })
// one line iterator works for both a terminal and piped input
// (rl.question drops buffered lines when stdin is a pipe)
const lines = rl[Symbol.asyncIterator]()
const ask = async (prompt) => {
  stdout.write(prompt)
  const { value, done } = await lines.next()
  return done ? '' : value.trim()
}

try {
  const dateAnswer = await ask(`Date (YYYY-MM-DD) [${today()}]: `)
  const date = dateAnswer || today()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`"${date}" isn't a YYYY-MM-DD date`)
  }
  if (entries.some((e) => e.date === date)) {
    throw new Error(`there's already an entry for ${date}; edit content/now.json directly`)
  }

  console.log('Leave a field blank to skip it.')
  const entry = { date }
  for (const [key, prompt] of FIELDS) {
    const answer = await ask(`${prompt}: `)
    if (answer) entry[key] = answer
  }
  if (Object.keys(entry).length === 1) throw new Error('nothing entered, so no entry was added')

  const next = [entry, ...entries].sort((a, b) => b.date.localeCompare(a.date))
  writeFileSync(NOW_PATH, JSON.stringify(next, null, 2) + '\n')
  console.log(`\nAdded ${date} to content/now.json. Commit it and merge to main to publish.`)
} catch (err) {
  console.error(`\nerror: ${err.message}`)
  process.exitCode = 1
} finally {
  rl.close()
}
