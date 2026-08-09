<<<<<<< HEAD
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material'

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, bgcolor: 'rgba(255,255,255,0.04)' }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography paragraph>
          This site is dedicated to sharing eFootball tournament information, match summaries, and tournament standings for the Gadhinglaj community. We value transparent data practices and aim to keep the experience clear and useful for all visitors.
        </Typography>
        <Typography paragraph>
          The site may use cookies and analytics tools to understand visitor behavior, improve content quality, and support advertising services such as Google AdSense. These tools may collect standard information such as IP address, browser type, device information, and interaction data.
        </Typography>
        <Typography paragraph>
          We use this information to maintain site performance, improve navigation, and evaluate which content is most useful to visitors. You can manage or disable cookies in your browser settings at any time.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>
          What information may be collected
        </Typography>
        <List dense>
          <ListItem><ListItemText primary="Browser and device details" /></ListItem>
          <ListItem><ListItemText primary="IP address and approximate location" /></ListItem>
          <ListItem><ListItemText primary="Pages visited and interaction with content" /></ListItem>
        </List>
        <Typography paragraph>
          By using this site, you agree to the collection and use of information described above in accordance with this policy.
=======
'use client'

import { Container, Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Privacy Policy
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph>
            eFootball Gadhinglaj Tournament Tracker ("Site") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography paragraph>
            We may collect information about your use of this Site, including:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Your IP address and browser information" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Pages you visit and how long you spend on them" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Referral sources and clickthrough data" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            3. Third-Party Advertising
          </Typography>
          <Typography paragraph>
            This Site uses Google AdSense to display advertisements. Google uses cookies and web beacons to serve ads based on your prior visits to this website and other sites. You can opt out of personalized advertising by visiting{' '}
            <Link href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </Link>.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            4. Cookies
          </Typography>
          <Typography paragraph>
            This Site and third-party vendors use cookies to serve ads based on your previous visits. These cookies help us understand user behavior and improve our content. You can manage cookie preferences in your browser settings.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            5. Data Protection
          </Typography>
          <Typography paragraph>
            We implement reasonable security measures to protect your information. However, no security system is completely secure, so we cannot guarantee absolute security.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            6. Third-Party Links
          </Typography>
          <Typography paragraph>
            This Site may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites. Please review their privacy policies before providing any personal information.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            7. Changes to This Policy
          </Typography>
          <Typography paragraph>
            We may update this Privacy Policy periodically. Changes will be effective immediately upon posting. Your continued use of this Site constitutes acceptance of any changes.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            8. Contact Us
          </Typography>
          <Typography paragraph>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <Link href="mailto:sourya7675@gmail.com">sourya7675@gmail.com</Link>.
          </Typography>
        </Box>

        <Typography variant="caption" color="textSecondary">
          Last updated: August 2024
>>>>>>> 585a2dc (Integrate AdSense support)
        </Typography>
      </Paper>
    </Container>
  )
}
