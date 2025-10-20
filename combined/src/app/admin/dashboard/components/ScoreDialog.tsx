import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, CircularProgress } from '@mui/material'
import { useMatches } from '../hooks/useMatches'
import { useTournaments } from '../hooks/useTournaments'

interface ScoreDialogProps {
  onSubmitScore: () => Promise<void>
}

export function ScoreDialog({ onSubmitScore }: ScoreDialogProps) {
  const matches = useMatches()
  const tournaments = useTournaments()

  return (
    <Dialog open={matches.scoreDialogOpen} onClose={matches.closeScoreDialog} className="score-dialog">
      <DialogTitle className="dialog-title">Enter Match Score</DialogTitle>
      <DialogContent className="dialog-content">
        <Typography sx={{ mb: 1 }} className="match-info">
          {matches.currentMatch ? 
            `${matches.getPlayerName(
              tournaments.tournaments.find(x => x.id === tournaments.selectedTournament), 
              matches.currentMatch.player1_id
            )} vs ${matches.getPlayerName(
              tournaments.tournaments.find(x => x.id === tournaments.selectedTournament), 
              matches.currentMatch.player2_id
            )}` : ''
          }
        </Typography>
        <TextField
          label="Score 1"
          value={matches.dialogScore1}
          onChange={e => matches.setDialogScore1(e.target.value)}
          sx={{ mr: 1 }}
          className="score-input"
        />
        <TextField
          label="Score 2"
          value={matches.dialogScore2}
          onChange={e => matches.setDialogScore2(e.target.value)}
          className="score-input"
        />
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={matches.closeScoreDialog} className="dialog-cancel-button">
          Cancel
        </Button>
        <Button
          onClick={onSubmitScore}
          variant="contained"
          className="dialog-submit-button"
          disabled={matches.submitScoreLoading}
        >
          {matches.submitScoreLoading ? <CircularProgress size={16} sx={{ mr: 1 }} /> : null}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}