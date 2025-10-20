'use client'

import React, { useEffect } from 'react'
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useTournaments } from './hooks/useTournaments'
import { usePlayers } from './hooks/usePlayers'
import { useMatches } from './hooks/useMatches'
import { TournamentCard } from './components/TournamentCard'
import { ScoreDialog } from './components/ScoreDialog'
import { CreateTournamentForm } from './components/CreateTournamentForm'
import { CreatePlayerForm } from './components/CreatePlayerForm'
import { AllPlayersManagement } from './components/AllPlayersManagement'

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout } = useAdminAuth()
  
  // Initialize hooks
  const tournaments = useTournaments()
  const players = usePlayers()
  const matches = useMatches()

  useEffect(() => {
    tournaments.loadTournaments()
    players.loadPlayers()
  }, [])

  // Load initial data
  const loadData = () => {
    tournaments.loadTournaments()
    players.loadPlayers()
  }

  // Generate matches for tournament
  const handleGenerateMatches = async (tournamentId: number) => {
    await tournaments.generateMatches(tournamentId)
    loadData()
  }

  // Set score for match
  const handleSetScore = (matchId: number) => {
    const tournament = tournaments.tournaments.find(t => 
      t.matches?.some((m: any) => m.id === matchId)
    )
    matches.openScoreDialog(matchId, tournaments.tournaments, tournament?.id || tournaments.selectedTournament)
    tournaments.setSelectedTournament(tournament?.id || tournaments.selectedTournament)
  }

  // Submit score for match
  const handleSubmitScore = async () => {
    await matches.submitScore()
    loadData()
  }

  // Delete tournament
  const handleDeleteTournament = async (tournamentId: number, tournamentName: string) => {
    await tournaments.deleteTournament(tournamentId, tournamentName)
    loadData()
  }

  // Remove player from tournament
  const handleRemovePlayerFromTournament = async (tournamentId: number, playerId: number, playerName: string) => {
    await players.removePlayerFromTournament(tournamentId, playerId, playerName)
    loadData()
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ color: '#b0bec5' }}>
          Verifying access...
        </Typography>
      </Box>
    )
  }

  // If not authenticated, the hook will redirect to /admin
  // This is just a fallback in case the redirect fails
  if (!isAuthenticated) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6" sx={{ color: '#f44336' }}>
          Access Denied
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0bec5' }}>
          Redirecting to login...
        </Typography>
      </Box>
    )
  }

  return (
    <Box className="admin-dashboard">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" className="dashboard-title">Admin Dashboard</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={logout}
          sx={{
            borderColor: '#f44336',
            color: '#f44336',
            '&:hover': {
              borderColor: '#d32f2f',
              backgroundColor: 'rgba(244, 67, 54, 0.1)'
            }
          }}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <CreateTournamentForm 
            onTournamentCreated={loadData}
          />
          
          <CreatePlayerForm 
            onPlayerCreated={loadData}
          />
          
          <AllPlayersManagement 
            onPlayersUpdated={loadData}
            selectedTournament={tournaments.selectedTournament}
            allPlayers={players.allPlayers}
            addPlayerLoading={players.addPlayerLoading}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" className="section-title">Tournaments</Typography>
          {tournaments.tournaments.map((tournament: any) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              selectedTournament={tournaments.selectedTournament}
              generateLoading={tournaments.generateLoading}
              onSetScore={handleSetScore}
              onGenerateMatches={handleGenerateMatches}
              onDeleteTournament={handleDeleteTournament}
              onRemovePlayer={handleRemovePlayerFromTournament}
              onSelectTournament={(id) => tournaments.setSelectedTournament(id)}
              onShowStandings={(id) => tournaments.showStandings(id)}
              onShowGroupStandings={(id) => tournaments.showGroupStandings(id)}
              onShowKnockoutBracket={(id) => tournaments.showKnockoutBracket(id)}
            />
          ))}
        </Grid>
      </Grid>
      
      <ScoreDialog onSubmitScore={handleSubmitScore} />
    </Box>
  )
}