import { LoadingButton } from "@mui/lab"
import {
  Button,
  Card,
  Container,
  Grid,
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

const PersonNew = () => {
  const [values, setValues] = useState<Person>({
    name: "",
    contact: "",
    comments: "",
    address: "",
  } as Person)
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }

    const res = await fetch("/api/person", requestOptions)

    if (res.status === 200) {
      setValues({
        ...values,
        _id: (await res.json())._id,
      })
      setReadOnly(true)
    }
    setIsLoading(false)
  }

  const props = {
    required: true,
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
        <title>Add a new Person</title>
      </Head>
      <PageTitle
        heading="Add a new Person"
        subHeading="Add a new Person to the database"
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add a new Person
          </Typography>
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
                name="contact"
                value={values.contact}
                inputMode="tel"
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
                  href="/admin/persons"
                  startIcon={<ArrowBack />}
                >
                  Back to Persons
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {readOnly ? (
                <TextField
                  label="Person ID"
                  name="_id"
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
                  Add Person
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

PersonNew.layout = SidebarLayout

export default PersonNew
