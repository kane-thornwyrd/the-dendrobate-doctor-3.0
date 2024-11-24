import { writeFileSync } from "fs"
import { readdir, readFile, writeFile } from "fs/promises"
import { join as pathJoin } from 'node:path'

const SOURCE = './src/articles/input'
const DESTINATION = './src/articles/output'

const listing: string[] = []

await Promise.allSettled((await readdir(SOURCE)).map(async filename => {

  listing.push(filename)

  try {

  const fullFilename = pathJoin(SOURCE, filename)
  const targetFile = pathJoin(DESTINATION, `${filename}.tsx`)
  const content = (await readFile(fullFilename, { encoding: 'utf8' }))
    .replace('<!DOCTYPE html>', '')
    .replace(/<\/?html[^>]*>/ig, '')
    .replace(/<head>([a-z0-9<>='"\/,._{}:#;@)(%\[\]-]|\s)+<\/head>/i, '')
    .replace(/<\/?body>/ig, '')
    .replace(/<p>\*\*\*<\/p>/ig, '<hr className="my-8" />')
    .replace(/style="[a-z0-9;:\.@_-]+"/ig, '')
    .replace(/<img(.*)alt=(['"])([^'"]*)\2\s([^>]*)\/>/gmi, '<img alt="$3" width={900} height={900}$1$4/>')
    .replace(/(<img(?!.*?alt=(['"]).*?\2)[^>]*)(\/>)/gmi, '$1alt="" $3')
    .replace(/<p><img([^>]+)\/><\/p>/gmi, '<LabeledImage$1 />')

  const hasImage = /<Image/i.test(content)
  const hasLabeledImage = /<LabeledImage/i.test(content)

  const tsxHeader = `
${hasImage ? "import Image from 'next/image'" : ''}
${hasLabeledImage ? "import { LabeledImage } from '@/components/serverside/LabeledImage'" : ''}
import '@/app/globals.css'
export default function ArticleContent() { return (<>
  `

  const tsxFooter = `
</>)}
  `

  await writeFile(targetFile, `${tsxHeader}${content}${tsxFooter}`, { flag: 'w+' })

  } catch(e) {
    console.warn(e)
  }
})).then(() => {
  writeFileSync('src/app/listing.json', JSON.stringify(listing, null, 2))
})