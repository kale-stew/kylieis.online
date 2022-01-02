import path from 'path'
import { compileLocalTemplate } from '@resoc/create-img'
import { FacebookOpenGraph } from '@resoc/core'

async function defaultSocialImage({ title, description, baseName }) {
  const ogImage = await compileLocalTemplate(
    'resoc-templates/landing/resoc.manifest.json',
    {},
    FacebookOpenGraph,
    `public/open-graph/${baseName}.jpg`
  )

  return {
    title,
    description,
    ogImage: path.basename(ogImage),
  }
}

async function socialImage({ title, description, baseName }) {
  const ogImage = await compileLocalTemplate(
    'resoc-templates/default/resoc.manifest.json',
    {
      title,
    },
    FacebookOpenGraph,
    `public/open-graph/${baseName}.jpg`
  )

  return {
    title,
    description,
    ogImage: path.basename(ogImage),
  }
}

export { defaultSocialImage, socialImage }
