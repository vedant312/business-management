import { RestartAlt, Save } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { ChangeEvent, WheelEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Entity, Material, Person, Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getActivePersons } from "src/lib/api/person"
import { getActiveSites } from "src/lib/api/site"
import numWords from "src/lib/words"

import { getAmount } from "."

interface MaterialNewProps {
  sites: Site[]
  persons: Person[]
}

const MaterialNew = ({ sites, persons }: MaterialNewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [values, setValues] = useState<Material>({
    date: new Date(),
    item: "",
    billNo: "",
    remarks: "",
  } as Material)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValue = name.endsWith("Rate") ? Number(value) : value
    setValues({
      ...values,
      [name]: newValue,
    })
  }

  const handleDateChange = (date: Date | null) => {
    if (!date) return
    setValues({
      ...values,
      date,
    })
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

  const handleAddMaterial = async () => {
    setIsLoading(true)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }

    const res = await fetch("/api/material", requestOptions)
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
        <title>New Material</title>
      </Head>
      <PageTitle
        heading="New Material"
        subHeading="Add a new Material to the database"
        sideText="Add a new Expense"
        sideTextLink="/admin/new/expense"
      />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Card>
              <Box px={4} py={3}>
                <Typography variant="h4">Add a new material</Typography>
                <Grid container spacing={2} my={1}>
                  <Grid item xs={12} md={4}>
                    <DatePicker
                      disabled={isLoading}
                      readOnly={readOnly}
                      inputFormat="d MMM yyyy"
                      label="Delivery date"
                      value={values.date}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Material Name"
                      name="item"
                      value={values.item}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Bill No."
                      name="billNo"
                      value={values.billNo}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Quantity"
                      name="quantity"
                      value={values.quantity}
                      {...props}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Material Rate (in ₹)"
                      name="materialRate"
                      value={values.materialRate}
                      helperText={numWords(values.materialRate)}
                      {...props}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Shipping Rate (in ₹)"
                      name="shippingRate"
                      value={values.shippingRate}
                      helperText={numWords(values.shippingRate)}
                      {...props}
                      type="number"
                      onWheel={handleWheel}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      disabled={isLoading}
                      readOnly={readOnly}
                      id="materialPerson"
                      options={persons}
                      getOptionLabel={(option) => option.name || ""}
                      value={values.materialPerson as Person}
                      onChange={(e, value, r) =>
                        setValues({
                          ...values,
                          materialPerson: value as Entity,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Material Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      disabled={isLoading}
                      readOnly={readOnly}
                      id="shipping_person"
                      options={persons}
                      getOptionLabel={(option) => option.name || ""}
                      value={values.shippingPerson as Person}
                      onChange={(e, value, r) =>
                        setValues({
                          ...values,
                          shippingPerson: value as Entity,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Shipping Person" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      disabled={isLoading}
                      readOnly={readOnly}
                      id="site"
                      options={sites}
                      getOptionLabel={(option) => option.name || ""}
                      value={values.site as Site}
                      onChange={(e, value, r) =>
                        setValues({
                          ...values,
                          site: value as Entity,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Site" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      value={values.remarks}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Material Amount (in ₹)"
                      value={getAmount(values).materialAmount}
                      helperText={numWords(getAmount(values).materialAmount)}
                      {...props}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Shipping Amount (in ₹)"
                      value={getAmount(values).shippingAmount}
                      helperText={numWords(getAmount(values).shippingAmount)}
                      {...props}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Amount (in ₹)"
                      value={getAmount(values).totalAmount}
                      helperText={numWords(getAmount(values).totalAmount)}
                      {...props}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {readOnly && (
                      <Button
                        fullWidth
                        variant="contained"
                        href="/admin/material/new"
                        startIcon={<RestartAlt />}
                      >
                        Add another
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {readOnly ? (
                      <TextField
                        label="Material ID"
                        name="_id"
                        value={values._id}
                        {...props}
                      />
                    ) : (
                      <LoadingButton
                        fullWidth
                        variant="contained"
                        onClick={handleAddMaterial}
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<Save />}
                      >
                        Add Material
                      </LoadingButton>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {readOnly && (
                      <Button
                        fullWidth
                        variant="contained"
                        href={`/admin/material?id=${values._id}`}
                      >
                        View/Edit
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

MaterialNew.layout = SidebarLayout

const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const activeSites = await getActiveSites()
  const sites = JSON.parse(JSON.stringify(activeSites))
  const activePersons = await getActivePersons()
  const persons = JSON.parse(JSON.stringify(activePersons))

  if (activeSites.length === 0 && activePersons.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      sites,
      persons,
    },
  }
}

export { getServerSideProps }
export default MaterialNew
