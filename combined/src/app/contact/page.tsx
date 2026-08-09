import { Container, Typography, Paper, Stack, Chip } from '@mui/material'

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'rgba(255,255,255,0.04)' }}>
        <Typography variant="h4" gutterBottom>
          Contact
        </Typography>
        <Typography paragraph>
          If you have questions about tournament updates, site feedback, or advertising-related concerns, please get in touch using the details below.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
          <Chip label="Phone: 9146704017" color="info" variant="outlined" />
          <Chip label="Email: sourya7675@gmail.com" color="info" variant="outlined" />
          <Chip label="Topic: Tournament updates" color="info" variant="outlined" />
          <Chip label="Topic: Site feedback" color="info" variant="outlined" />
        </Stack>
        <Typography sx={{ mt: 3 }}>
          We aim to keep the site useful, accurate, and easy to follow for players and fans interested in local eFootball events.
        </Typography>
      </Paper>
    </Container>
  )
}
