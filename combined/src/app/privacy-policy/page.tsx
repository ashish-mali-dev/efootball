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
        </Typography>
      </Paper>
    </Container>
  )
}
