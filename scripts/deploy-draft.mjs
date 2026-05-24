import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

function slugify(name) {
  return name
    .replace(/^(blog|post)\//, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30)
}

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`)
  return execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts })
}

async function main() {
  // Parse args
  const args = process.argv.slice(2)
  const nameFlag = args.find((a) => a.startsWith('--name='))
  const customName = nameFlag ? nameFlag.split('=')[1] : null

  // Get branch name from git or args
  let branch
  try {
    branch = execSync('git branch --show-current', { cwd: ROOT, encoding: 'utf8' }).trim()
  } catch {
    branch = 'draft'
  }

  const slug = slugify(customName || branch)
  const workerName = `post-${slug}`
  const url = `https://${workerName}.kylieski.workers.dev`

  console.log(`\n📸 Draft deploy: ${workerName}`)
  console.log(`   URL: ${url}\n`)

  // Build static assets
  console.log('Building static assets...')
  run('npm run build')

  // Apply migrations to preview db
  console.log('\nApplying D1 migrations to preview db...')
  run('npx wrangler d1 migrations apply kylieis-online-db-preview --remote --env preview')

  // Seed preview db
  console.log('\nSeeding preview db...')
  run('npx tsx scripts/seed-db.mjs > /tmp/seed.sql && npx wrangler d1 execute kylieis-online-db-preview --remote --env preview --file /tmp/seed.sql')

  // Generate draft wrangler config
  console.log('\nGenerating draft wrangler config...')
  const configPath = path.join(ROOT, 'wrangler.jsonc')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

  config.name = workerName
  config.d1_databases[0].database_id = '77521670-d5ba-43af-bd95-c4370dfcba4b'
  config.d1_databases[0].database_name = 'kylieis-online-db-preview'
  delete config.routes
  delete config.env

  const draftConfigPath = path.join(ROOT, 'wrangler-draft.jsonc')
  fs.writeFileSync(draftConfigPath, JSON.stringify(config, null, 2))

  // Deploy
  console.log('\nDeploying draft...')
  run(`npx wrangler deploy --config wrangler-draft.jsonc`)

  console.log(`\n✅ Draft deployed!`)
  console.log(`   ${url}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
