'use client'

import React, { useEffect } from 'react'
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useTournaments } from './hooks/useTournaments'
import { usePlayers } from './hooks/usePlayers'
import { useMatches } from './hooks/useMatches'
import { useDashboardForms } from './hooks/useDashboardForms'
import { TournamentCard } from './components/TournamentCard'
import { ScoreDialog } from './components/ScoreDialog'

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout } = useAdminAuth()
  
  // Initialize all custom hooks
  const tournaments = useTournaments()
  const players = usePlayers()
  const matches = useMatches()
  const forms = useDashboardForms()

  useEffect(() => {
    tournaments.loadTournaments()
    players.loadPlayers()
  }, [])

  // Load initial data
  const loadData = () => {
    tournaments.loadTournaments()
    players.loadPlayers()
  }

  // Create tournament using forms hook data
  const handleCreateTournament = async () => {
    const formData = forms.getTournamentFormData()
    await tournaments.createTournament(formData)
    forms.resetTournamentForm()
    loadData()
  }

  // Create player using forms hook data
  const handleCreatePlayer = async () => {
    await players.createPlayer(forms.playerName)
    forms.resetPlayerForm()
    loadData()
  }

  // Add player to tournament
  const handleAddPlayerToTournament = async (playerId: number) => {
    await players.addPlayerToTournament(playerId, tournaments.selectedTournament)
    loadData()
  }

  // Add all players to tournament
  const handleAddAllPlayersToTournament = async () => {
    await players.addAllPlayersToTournament(tournaments.selectedTournament)
    loadData()
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
          <Button variant="outlined" onClick={() => forms.setShowCreateTournament(!forms.showCreateTournament)} sx={{ mt: 2 }}>
            {forms.showCreateTournament ? 'Hide Create Tournament' : 'Show Create Tournament'}
          </Button>
          {forms.showCreateTournament && (
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h6" className="card-title">Create Tournament</Typography>
                <TextField
                  fullWidth
                  label="Tournament name"
                  value={forms.name}
                  onChange={e => forms.setName(e.target.value)}
                  sx={{ mt: 1, mb: 2 }}
                  className="dashboard-input"
                />

                <Typography variant="subtitle2" sx={{ mb: 1, color: '#b0bec5' }}>
                  Tournament Type
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant={forms.tournamentType === 'round_robin' ? "contained" : "outlined"}
                    onClick={() => {
                      forms.setTournamentType('round_robin')
                      forms.setThirdPlacePlayoff(false)
                    }}
                    sx={{ mr: 1, mb: 1 }}
                    size="small"
                  >
                    Round Robin
                  </Button>
                  <Button
                    variant={forms.tournamentType === 'group_and_knockout' ? "contained" : "outlined"}
                    onClick={() => {
                      forms.setTournamentType('group_and_knockout')
                      forms.setThirdPlacePlayoff(true)
                    }}
                    size="small"
                    sx={{ mb: 1 }}
                  >
                    Group + Knockout
                  </Button>
                </Box>

                {forms.tournamentType === 'group_and_knockout' && (
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Teams per group"
                      type="number"
                      value={forms.teamsPerGroup}
                      onChange={e => forms.setTeamsPerGroup(Number(e.target.value))}
                      inputProps={{ min: 3, max: 8 }}
                      sx={{ mb: 1 }}
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="Teams advancing per group"
                      type="number"
                      value={forms.teamsAdvancing}
                      onChange={e => forms.setTeamsAdvancing(Number(e.target.value))}
                      inputProps={{ min: 1, max: forms.teamsPerGroup - 1 }}
                      sx={{ mb: 1 }}
                      size="small"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant={forms.allowThirdPlace ? "contained" : "outlined"}
                        onClick={() => forms.setAllowThirdPlace(!forms.allowThirdPlace)}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Allow 3rd place teams: {forms.allowThirdPlace ? 'Yes' : 'No'}
                      </Button>
                      <Button
                        variant={forms.thirdPlacePlayoff ? "contained" : "outlined"}
                        onClick={() => forms.setThirdPlacePlayoff(!forms.thirdPlacePlayoff)}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        3rd place playoff: {forms.thirdPlacePlayoff ? 'Yes' : 'No'}
                      </Button>
                    </Box>
                  </Box>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCreateTournament}
                  className="dashboard-button"
                  disabled={tournaments.creatingTournament}
                >
                  {tournaments.creatingTournament ? <CircularProgress size={16} sx={{ mr: 1 }} /> : null}
                  Create Tournament
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 🔹 Toggle: Create Player */}
          <Button variant="outlined" onClick={() => forms.setShowCreatePlayer(!forms.showCreatePlayer)} sx={{ mt: 2 }}>
            {forms.showCreatePlayer ? 'Hide Create Player' : 'Show Create Player'}
          </Button>
          {forms.showCreatePlayer && (
            <Card className="dashboard-card" sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" className="card-title">Create Player</Typography>
                <TextField
                  fullWidth
                  label="Player name"
                  value={forms.playerName}
                  onChange={e => forms.setPlayerName(e.target.value)}
                  sx={{ mt: 1 }}
                  className="dashboard-input"
                />
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={handleCreatePlayer}
                  className="dashboard-button"
                  disabled={players.creatingPlayer}
                >
                  {players.creatingPlayer ? <CircularProgress size={16} sx={{ mr: 1 }} /> : null}
                  Create
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 🔹 Toggle: All Players */}
          <Button variant="outlined" onClick={() => forms.setShowAllPlayers(!forms.showAllPlayers)} sx={{ mt: 2 }}>
            {forms.showAllPlayers ? 'Hide All Players' : 'Show All Players'}
          </Button>
          {forms.showAllPlayers && (
            <Card className="dashboard-card" sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" className="card-title">All Players</Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#b0bec5' }}>
                  Select a tournament first, then click "Add to selected" to add players
                </Typography>
                {players.allPlayers.length > 0 && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAddAllPlayersToTournament}
                    disabled={players.addPlayerLoading || !tournaments.selectedTournament}
                    sx={{ mb: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
                  >
                    {players.addPlayerLoading ? <CircularProgress size={16} sx={{ mr: 1 }} /> : null}
                    Add all to selected tournament
                  </Button>
                )}
                <Box className="players-list">
                  {players.allPlayers.map((p: any) => (
                    <Box key={p.id} className="player-item">
                      <span className="player-name">{p.name}</span>
                      <Button
                        size="small"
                        onClick={() => handleAddPlayerToTournament(p.id)}
                        disabled={players.addPlayerLoading || !tournaments.selectedTournament}
                        className="player-action-button"
                        variant="outlined"
                      >
                        {players.addPlayerLoading ? <CircularProgress size={12} /> : 'Add to selected'}
                      </Button>
                    </Box>
                  ))}
                  {players.allPlayers.length === 0 && (
                    <Typography variant="body2" sx={{ color: '#b0bec5', fontStyle: 'italic' }}>
                      No players created yet
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" className="section-title">Tournaments</Typography>
          {tournaments.tournaments.map((tournament: any) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onSetScore={handleSetScore}
              onGenerateMatches={handleGenerateMatches}
              onDeleteTournament={handleDeleteTournament}
              onRemovePlayer={handleRemovePlayerFromTournament}
            />
          ))}
        </Grid>
      </Grid>
      
      <ScoreDialog onSubmitScore={handleSubmitScore} />
    </Box>
  )
}