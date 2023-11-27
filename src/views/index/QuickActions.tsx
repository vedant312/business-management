import { Box, Button, Card, Grid, Typography } from "@mui/material"

import quickLinks from "src/constants/quickLinks"

const QuickActions = () => (
  <Card>
    <Box p={4}>
      <Typography
        sx={{
          pb: 3,
        }}
        variant="h4"
      >
        Quick Links
      </Typography>
      <Grid container spacing={3} pb={3}>
        <Grid sm={12} md={4} item>
          <Button fullWidth variant="contained" href="/admin/expense/new">
            Add Expense
          </Button>
        </Grid>
        <Grid sm={12} md={4} item>
          <Button fullWidth variant="contained" href="/admin/material/new">
            Add Material
          </Button>
        </Grid>
        <Grid sm={12} md={4} item>
          <Button fullWidth variant="contained" href="/admin/person/new">
            Add Person
          </Button>
        </Grid>
        <Grid sm={12} md={4} item>
          <Button fullWidth variant="contained" href="/admin/site/new">
            Add Site
          </Button>
        </Grid>
        {quickLinks.map((link) => (
          <Grid sm={12} md={4} item key={link.src}>
            <Button
              fullWidth
              variant={link.variant || "outlined"}
              href={link.src}
            >
              {link.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Card>
)

export default QuickActions
