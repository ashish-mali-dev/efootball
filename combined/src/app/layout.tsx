import type { Metadata } from 'next'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import ThemeClientProvider from '@/components/ThemeProvider'
import styles from './layout.module.css'
import './globals.css'

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-7117852267245022'

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'eFootball Gadhinglaj Tournament Tracker',
  description: 'Follow eFootball tournaments, match results, standings, and event updates for the Gadhinglaj community.',
  keywords: ['efootball', 'tournament', 'football', 'matches', 'standings', 'gadhinglaj'],
  openGraph: {
    title: 'eFootball Gadhinglaj Tournament Tracker',
    description: 'Follow eFootball tournaments, match results, standings, and event updates for the Gadhinglaj community.',
=======
  title: 'eFootball Gadhinglaj - Tournament Manager',
  description: 'Organize and track eFootball tournaments in Gadhinglaj. Tournament management system for competitive gaming.',
  keywords: 'eFootball, tournament, Gadhinglaj, gaming, matches, brackets',
  openGraph: {
    title: 'eFootball Gadhinglaj - Tournament Manager',
    description: 'Organize and track eFootball tournaments in Gadhinglaj',
    url: 'https://efootball-gad.vercel.app',
    siteName: 'eFootball Gadhinglaj',
>>>>>>> 585a2dc (Integrate AdSense support)
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`} crossOrigin="anonymous"></script>
      </head>
      <body>
        <ThemeClientProvider>
          <AppBar position="static">
            <Toolbar>
              <Box className={styles.navContainer}>
                <Link href="/" className={styles.logoLink}>
                  <Box className={styles.logoContainer}>
                    <Image
                      src="/logo.png"
                      alt="eFootball Tournament Manager"
                      width={40}
                      height={40}
                      className={styles.logoImage}
                    />
                  </Box>
                </Link>
              </Box>
              <Button color="inherit" component={Link} href="/" className={styles.navButton}>Home</Button>
              <Button color="inherit" component={Link} href="/details" className={styles.navButton}>Get Match Details</Button>
<<<<<<< HEAD
              <Button color="inherit" component={Link} href="/privacy-policy">Privacy Policy</Button>
              <Button color="inherit" component={Link} href="/contact">Contact</Button>
=======
              <Button color="inherit" component={Link} href="/privacy-policy" className={styles.navButton}>Privacy</Button>
              <Button color="inherit" component={Link} href="/contact" className={styles.navButton}>Contact</Button>
>>>>>>> 585a2dc (Integrate AdSense support)
              <Button color="inherit" component={Link} href="/admin">Admin</Button>
            </Toolbar>
          </AppBar>
          <Container className={styles.mainContainer}>
            {children}
          </Container>
        </ThemeClientProvider>
      </body>
    </html>
  )
}
