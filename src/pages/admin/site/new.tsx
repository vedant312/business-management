import { LoadingButton } from "@mui/lab"
import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import Head from "next/head"
import SaveIcon from "@mui/icons-material/Save"
import { ChangeEvent, WheelEvent, useState } from "react"
import { ArrowBack } from "@mui/icons-material"

import PageTitle from "src/components/PageTitle"
import { Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import numWords from "src/lib/words"

const SiteNew = () => {
  const [values, setValues] = useState<Site>({} as Site)
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

    const res = await fetch("/api/site", requestOptions)

    if (res.status === 200) {
      setValues({
        ...values,
        _id: (await res.json())._id,
      })
      setReadOnly(true)
    }
    setIsLoading(false)
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

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
        <title>Add a new Site</title>
      </Head>
      <PageTitle
        heading="Add a new Construction Site"
        subHeading="Create a new construction site and add to database"
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4">Add a new Construction Site</Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Fill in the form below to add a new construction site to the
            database
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
            <Grid item xs={12} md={4}>
              <TextField
                label="Address"
                name="address"
                value={values.address}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Completion Date"
                inputFormat="d MMM yyyy"
                value={values.completionDate}
                onChange={(newDate) =>
                  setValues({ ...values, completionDate: newDate as Date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Agreement Info"
                name="agreementInfo"
                value={values.agreementInfo}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Agreement Date"
                inputFormat="d MMM yyyy"
                value={values.agreementDate}
                onChange={(newDate) =>
                  setValues({ ...values, agreementDate: newDate as Date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Tender Info"
                name="tenderInfo"
                value={values.tenderInfo}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="BOQ Cost"
                name="boqCost"
                value={values.boqCost}
                helperText={numWords(values.boqCost)}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Work Name"
                name="workName"
                value={values.workName}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Fund"
                name="fund"
                value={values.fund}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rate"
                name="rate"
                value={values.rate}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Estimated Cost"
                name="estimatedCost"
                value={values.estimatedCost}
                helperText={numWords(values.estimatedCost)}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Agreement Value"
                name="agreementValue"
                value={values.agreementValue}
                helperText={numWords(values.agreementValue)}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Department"
                name="department"
                value={values.department}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="agency">Agency</InputLabel>
                <Select
                  id="agency"
                  value={values.agency}
                  onChange={(e) =>
                    setValues({ ...values, agency: e.target.value as string })
                  }
                  name="agency"
                  label="Agency"
                  disabled={isLoading}
                >
                  <MenuItem value="Pole Star Enterprises">
                    Pole Star Enterprises
                  </MenuItem>
                  <MenuItem value="Manoj Kumar">Manoj Kumar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comments"
                name="comments"
                value={values.comments}
                multiline
                {...props}
                required={false}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {readOnly && (
                <Button
                  fullWidth
                  variant="contained"
                  href="/admin/sites"
                  startIcon={<ArrowBack />}
                >
                  Back to Sites
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {readOnly ? (
                <TextField
                  label="Site ID"
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
                  Add Site
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

SiteNew.layout = SidebarLayout

export default SiteNew
