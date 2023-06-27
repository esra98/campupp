import { createReadStream } from 'fs'
import { SitemapStream } from 'sitemap'

// Replace with your own utility function to fetch pages
const getAllPages = async () => {
  // Your implementation to fetch pages
  // Return an array of page objects with appropriate properties
  return [
    { slug: '/page1', updatedAt: '2023-06-18' },
    { slug: '/page2', updatedAt: '2023-06-17' },
    // Add more pages as needed
  ]
}

export default async (req, res) => {
  try {
    const pages = await getAllPages()

    const stream = new SitemapStream({ hostname: 'https://www.example.com' }) // Replace with your own hostname

    pages.forEach((page) => {
      stream.write({ url: page.slug, lastmod: page.updatedAt })
    })

    stream.end()

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=0.1')

    const xmlString = await streamToPromise(stream)
    res.send(xmlString)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).end()
  }
}

// Helper function to convert the stream to a promise
function streamToPromise(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (error) => reject(error))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
  })
}
