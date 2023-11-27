import { Card, Grid, Switch, TextField, Typography } from "@mui/material"

import { Person } from "src/constants/models"

interface PersonDetailsProps {
  person: Person
}
const PersonDetails = ({ person }: PersonDetailsProps) => (
  <Card sx={{ p: { xs: 2, md: 4 } }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4">Person Details</Typography>
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          All transactions of this person is listed below
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "inline",
          textAlign: { xs: "left", md: "right" },
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography sx={{ display: "inline" }}>
          {person.isActive ? "Active" : "Inactive"} Person
        </Typography>
        <Switch
          checked={person.isActive}
          readOnly
          name="isActive"
          color="primary"
          inputProps={{ "aria-label": "controlled" }}
        />
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Name"
          name="name"
          value={person.name}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Address"
          name="address"
          value={person.address}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Contact"
          name="contact"
          value={person.contact}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Comments"
          name="comments"
          value={person.comments}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Created At"
          name="createdAt"
          value={new Date(person.createdAt).toLocaleString()}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Updated At"
          name="updatedAt"
          value={new Date(person.updatedAt).toLocaleString()}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          inputProps={{ readOnly: true }}
          label="Person ID"
          name="personId"
          value={person._id}
        />
      </Grid>
    </Grid>
  </Card>
)

export default PersonDetails
