'use client'

<<<<<<< HEAD
import { useEffect, useMemo } from 'react'
import { Box } from '@mui/material'

type Props = {
  adSlot?: string
  adFormat?: 'auto' | 'rectangle' | 'fluid'
  adLayout?: string
  style?: React.CSSProperties
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  adLayout = 'in-article',
  style,
}: Props) {
  const shouldRender = useMemo(() => Boolean(adSlot), [adSlot])

  useEffect(() => {
    if (!shouldRender) return

    try {
      ;(window as Window & { adsbygoogle?: Array<unknown> }).adsbygoogle = (window as Window & { adsbygoogle?: Array<unknown> }).adsbygoogle || []
      ;(window as Window & { adsbygoogle?: Array<unknown> }).adsbygoogle.push({})
    } catch {
      // Ignore AdSense initialization issues in development.
    }
  }, [shouldRender])

  if (!shouldRender) return null

  return (
    <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', maxWidth: 728, minHeight: 90, ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7117852267245022'}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
=======
import { useEffect } from 'react'
import { Box } from '@mui/material'

interface AdSenseAdProps {
  adSlot?: string
  style?: React.CSSProperties
}

export default function AdSenseAd({ adSlot, style }: AdSenseAdProps) {
  useEffect(() => {
    if (adSlot && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.log('AdSense error:', err)
      }
    }
  }, [adSlot])

  // Don't render if no slot provided (waiting for real slot from Google)
  if (!adSlot) {
    return null
  }

  return (
    <Box sx={{ my: 2, ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
>>>>>>> 585a2dc (Integrate AdSense support)
      />
    </Box>
  )
}
