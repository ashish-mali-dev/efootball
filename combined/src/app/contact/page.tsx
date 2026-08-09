<<<<<<< HEAD
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
=======
'use client'

import { Container, Paper, Typography, Box, Chip, Stack } from '@mui/material'
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

export default function Contact() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Contact Us
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            About This Site
          </Typography>
          <Typography paragraph>
            eFootball Gadhinglaj Tournament Tracker is a tournament management system designed to help organize and track eFootball matches and tournaments in Gadhinglaj.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Typography paragraph>
            Have questions or suggestions? We'd love to hear from you!
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip
              icon={<EmailIcon />}
              label="sourya7675@gmail.com"
              component="a"
              href="mailto:sourya7675@gmail.com"
              clickable
              color="primary"
            />
            <Chip
              icon={<PhoneIcon />}
              label="9146704017"
              component="a"
              href="tel:9146704017"
              clickable
              color="primary"
            />
          </Stack>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            What We Do
          </Typography>
          <Typography paragraph>
            Our platform provides:
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Tournament creation and management
            </Typography>
            <Typography variant="body2">
              • Match scheduling and bracket generation
            </Typography>
            <Typography variant="body2">
              • Player statistics and standings tracking
            </Typography>
            <Typography variant="body2">
              • Real-time match updates and results
            </Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="body2" color="textSecondary">
            For technical support or partnership inquiries, please email us directly.
          </Typography>
        </Box>
>>>>>>> 585a2dc (Integrate AdSense support)
      </Paper>
    </Container>
  )
}
