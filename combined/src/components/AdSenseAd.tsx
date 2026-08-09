'use client'

import { CSSProperties, useEffect, useMemo } from 'react'
import { Box } from '@mui/material'

type Props = {
  adSlot?: string
  adFormat?: 'auto' | 'rectangle' | 'fluid'
  adLayout?: string
  style?: CSSProperties
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
      const adsbygoogle = (window as Window & { adsbygoogle?: Array<unknown> }).adsbygoogle || []
      ;(window as Window & { adsbygoogle?: Array<unknown> }).adsbygoogle = adsbygoogle
      adsbygoogle.push({})
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
        data-full-width-responsive="true"
      />
    </Box>
  )
}
