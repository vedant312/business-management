import { ArrowBack, OpenInNew, RestartAlt } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"

import PageTitle from "src/components/PageTitle"
import { Material } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getMaterial } from "src/lib/api/material"
import numWords from "src/lib/words"

export const getAmount = (material: Material) => {
  const materialRate = material.materialRate || 0
  const shippingRate = material.shippingRate || 0
  const quantity = material.quantity || 0
  const materialAmount = materialRate * quantity
  const shippingAmount = shippingRate * quantity
  const totalAmount = materialAmount + shippingAmount
  return { totalAmount, materialAmount, shippingAmount }
}

interface MaterialIndexProps {
  material: Material
}

const MaterialIndex = ({ material }: MaterialIndexProps) => {
  const props = {
    fullWidth: true,
    inputProps: {
      readOnly: true,
    },
  }

  return (
    <>
      <Head>
        <title>View Material</title>
      </Head>
      <PageTitle
        heading="View Material"
        subHeading="View material from database"
        sideText="Edit this material"
        sideTextLink={`/admin/material/edit?id=${material._id}`}
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
                <Typography variant="h4">View a material</Typography>
                <Grid container spacing={2} my={1}>
                  <Grid item xs={12} md={4}>
                    <DatePicker
                      readOnly
                      label="Dilevery Date"
                      inputFormat="d MMM yyyy"
                      value={material.date}
                      onChange={(e) => null}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Material Name"
                      value={material.item}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Bill No."
                      value={material.billNo}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Quantity"
                      value={material.quantity}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Material Rate (in ₹)"
                      value={numWords(material.materialRate)}
                      multiline
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Transport Rate (in ₹)"
                      value={numWords(material.shippingRate)}
                      multiline
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={10} md={3.5}>
                    <TextField
                      label="Site Name"
                      name="site"
                      value={material.site?.name || "NA"}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={2} md={0.5}>
                    {material.site?._id && (
                      <IconButton href={`/admin/site/${material.site?._id}`}>
                        <OpenInNew fontSize="small" color="disabled" />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={10} md={3.5}>
                    <TextField
                      label="Material of"
                      name="site"
                      value={material.materialPerson?.name || "NA"}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={2} md={0.5}>
                    {material.materialPerson?._id && (
                      <IconButton
                        href={`/admin/person/${material.materialPerson?._id}`}
                      >
                        <OpenInNew fontSize="small" color="disabled" />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={10} md={3.5}>
                    <TextField
                      label="Shipped by"
                      name="site"
                      value={material.shippingPerson?.name || "NA"}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={2} md={0.5}>
                    {material.shippingPerson?._id && (
                      <IconButton
                        href={`/admin/person/${material.shippingPerson?._id}`}
                      >
                        <OpenInNew fontSize="small" color="disabled" />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      value={material.remarks}
                      multiline
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Material Amount (in ₹)"
                      value={numWords(getAmount(material).materialAmount)}
                      {...props}
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Shipping Amount (in ₹)"
                      value={numWords(getAmount(material).shippingAmount)}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Total Amount (in ₹)"
                      value={numWords(getAmount(material).totalAmount)}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Created At"
                      name="createdAt"
                      value={new Date(material.createdAt).toLocaleString()}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Material ID"
                      name="_id"
                      value={material._id}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Updated At"
                      name="updatedAt"
                      value={new Date(material.updatedAt).toLocaleString()}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} />
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      href="/admin"
                      startIcon={<ArrowBack />}
                    >
                      Back to home page
                    </Button>
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

MaterialIndex.layout = SidebarLayout

const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as string
  if (!id) return { redirect: { destination: "/admin", permanent: false } }

  const result = await getMaterial(id)
  if (result === null) return { notFound: true }

  const material = JSON.parse(JSON.stringify(result))
  return {
    props: {
      material,
    },
  }
}

export { getServerSideProps }
export default MaterialIndex
