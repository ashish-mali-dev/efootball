import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://efootball-gad.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://efootball-gad.vercel.app/details',
      lastModified: new Date(),
<<<<<<< HEAD
      changeFrequency: 'weekly',
=======
      changeFrequency: 'daily',
>>>>>>> 585a2dc (Integrate AdSense support)
      priority: 0.8,
    },
    {
      url: 'https://efootball-gad.vercel.app/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://efootball-gad.vercel.app/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
