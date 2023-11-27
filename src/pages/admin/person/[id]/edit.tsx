import { LoadingButton } from "@mui/lab"
import {
  Button,
  Card,
  Container,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { ChangeEvent, useState } from "react"
import SaveIcon from "@mui/icons-material/Save"
import { ArrowBack } from "@mui/icons-material"

import PageTitle from "src/components/PageTitle"
import { Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"

import { getServerSideProps } from "."

const PersonEdit = ({ person }: { person: Person }) => {
  const [values, setValues] = useState<Person>(person)
  const [isLoading, setIsLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }

    const res = await fetch(`/api/person`, requestOptions)

    if (res.status === 200) {
      setReadOnly(true)
    }

    setIsLoading(false)
  }

  const props = {
    fullWidth: true,
    onChange: handleInputChange,
    disabled: isLoading,
    inputProps: {
      readOnly,
    },
  }

  return (
    <>
      <Head>
        <title>Edit a Person</title>
      </Head>
      <PageTitle
        heading={`Editing data of ${values.name}`}
        subHeading={`Edit Person with id ${values._id}`}
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">Edit a Person</Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                Change the details and save
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
                {values.isActive ? "Active" : "Inactive"} Person
              </Typography>
              <Switch
                checked={values.isActive}
                onChange={(e, checked) => {
                  setValues({
                    ...values,
                    isActive: checked,
                  })
                }}
                disabled={isLoading}
                readOnly={readOnly}
                name="isActive"
                color="primary"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Address"
                name="address"
                value={values.address}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Contact"
                inputMode="tel"
                name="contact"
                value={values.contact}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Comments"
                name="comments"
                value={values.comments}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {readOnly && (
                <Button
                  fullWidth
                  variant="contained"
                  href={`/admin/person/${values._id}`}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {readOnly ? (
                <TextField
                  label="Site ID"
                  name="siteId"
                  value={values._id}
                  {...props}
                />
              ) : (
                <LoadingButton
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                >
                  Save Person
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

PersonEdit.layout = SidebarLayout

export { getServerSideProps }
export default PersonEdit
