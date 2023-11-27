import { Avatar, Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { getUserByID } from "src/lib/api/user"

const PageHeader = ({ userid }: { userid: string }) => {
  const theme = useTheme()
  const user = getUserByID(userid)

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8),
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start tracking expenses!
        </Typography>
      </Grid>
    </Grid>
  )
}

export default PageHeader
