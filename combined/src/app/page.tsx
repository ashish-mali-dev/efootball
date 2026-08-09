'use client'

import React from 'react'
import { Typography, Box, Paper, Chip, Stack, Alert, Divider } from '@mui/material'
import { useTournaments } from './hooks/useTournaments'
import { TournamentCard } from './components/TournamentCard'
import AdSenseAd from '@/components/AdSenseAd'
import styles from './page.module.css'

export default function Home() {
  const { 
    tournaments, 
    details, 
    loadError, 
    toggleExpanded, 
    toggleShowAllMatches 
  } = useTournaments()

  return (
    <div>
      <Box className={styles.pageHeader}>
        <Typography variant="h3" className={styles.mainTitle}>
          ⚽ eFootball Gadhinglaj
        </Typography>
        <Typography variant="h6" sx={{ color: '#bfe9ff', maxWidth: 800, mx: 'auto', mb: 2 }}>
          Track local eFootball tournaments, follow match results, and explore standings in one easy-to-read hub for the Gadhinglaj community.
        </Typography>
      </Box>

      {loadError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {loadError}. Tournament data is currently unavailable, but the page is ready to display results as soon as the backend is reachable.
        </Alert>
      )}

      <AdSenseAd adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} adFormat="horizontal" />

      <Box className="tournaments-list">
        {tournaments.length === 0 && !loadError && (
          <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(0,229,255,0.25)' }}>
            <Typography variant="h6" gutterBottom>
              No tournament data is available yet
            </Typography>
            <Typography sx={{ color: '#cfe8f7' }}>
              This page will show upcoming and completed tournaments here once the tournament data is loaded.
            </Typography>
          </Paper>
        )}
        
        {tournaments.map(tournament => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            details={details[tournament.id] || {}}
            onToggleExpanded={toggleExpanded}
            onToggleShowAllMatches={toggleShowAllMatches}
          />
        ))}
      </Box>

      <AdSenseAd adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} adFormat="horizontal" />

      <Paper sx={{ p: { xs: 2, md: 3 }, mt: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,229,255,0.16)' }}>
        <Typography variant="h5" gutterBottom>
          What this site offers
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Chip label="Tournament results" color="info" variant="outlined" />
          <Chip label="Live match details" color="info" variant="outlined" />
          <Chip label="Standings and progress" color="info" variant="outlined" />
          <Chip label="Community-friendly layout" color="info" variant="outlined" />
        </Stack>
        <Typography sx={{ mt: 2, color: '#dcecf7' }}>
          This platform is designed to help players, organizers, and fans follow tournament progress with clear summaries, match lists, and final results.
        </Typography>
      </Paper>
    </div>
  )
}