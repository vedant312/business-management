import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { GetServerSidePropsContext } from "next"

import PageTitle from "src/components/PageTitle"
import { Expense, Material, Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import PersonDetails from "src/views/PersonDetails"
import DataGrid from "src/components/DataGrid"
import { expenseColDef } from "src/constants/colDefs"
import { materialColDefPerson } from "src/constants/colDefs/material"
import { getPerson } from "src/lib/api/person"
import { getExpensesByPerson } from "src/lib/api/expense"
import {
  getMaterialsByPerson,
  getMaterialsByShipper,
} from "src/lib/api/material"
import { formatAmount } from "src/constants/colDefs/base"
import numWords from "src/lib/words"

import { getAmount } from "../../material"

interface PersonIndexProps {
  person: Person
  expenses: Expense[]
  shippedMaterials: Material[]
  ownedMaterials: Material[]
}

const PersonIndex = ({
  person,
  expenses,
  shippedMaterials,
  ownedMaterials,
}: PersonIndexProps) => {
  const totalExpenses = expenses.reduce(
    (a, b) => a + (Number.isNaN(Number(b.amount)) ? 0 : Number(b.amount)),
    0
  )
  const totalOwnedMaterials = ownedMaterials.reduce(
    (a, b) => a + getAmount(b).materialAmount,
    0
  )
  const totalShippedMaterials = shippedMaterials.reduce(
    (a, b) => a + getAmount(b).shippingAmount,
    0
  )
  const totalMaterial = totalShippedMaterials + totalOwnedMaterials

  const overview = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Amount Paid"
              value={formatAmount(totalExpenses)}
              fullWidth
              helperText={numWords(totalExpenses)}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Material Sold"
              value={formatAmount(totalOwnedMaterials)}
              fullWidth
              helperText={numWords(totalOwnedMaterials)}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Material Shipped"
              value={formatAmount(totalShippedMaterials)}
              fullWidth
              helperText={numWords(totalShippedMaterials)}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Total Amount to be paid"
              value={formatAmount(totalMaterial)}
              fullWidth
              helperText={numWords(totalMaterial)}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Status"
              value={
                // eslint-disable-next-line no-nested-ternary
                totalMaterial > totalExpenses
                  ? "Pending"
                  : totalMaterial < totalExpenses
                  ? "Overpayment"
                  : "Settled"
              }
              fullWidth
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Overdue Amount"
              value={formatAmount(Math.abs(totalMaterial - totalExpenses))}
              fullWidth
              helperText={numWords(Math.abs(totalMaterial - totalExpenses))}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )

  const expensesDatagrid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Expenses
        </Typography>
        <DataGrid
          rows={expenses}
          columns={expenseColDef}
          hiddenColumns={["person"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Expenses: {formatAmount(totalExpenses)}
        </Typography>
      </Box>
    </Card>
  )

  const ownedMaterialsDatarid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Material Sold
        </Typography>
        <DataGrid
          rows={ownedMaterials}
          columns={materialColDefPerson}
          hiddenColumns={["shippingRate", "quantity", "materialPerson"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Amount: {formatAmount(totalOwnedMaterials)}
        </Typography>
      </Box>
    </Card>
  )

  const shippedMaterialsDatarid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          Material Shipped
        </Typography>
        <DataGrid
          rows={shippedMaterials}
          columns={materialColDefPerson}
          hiddenColumns={["materialRate", "quantity", "shippingPerson"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Amount: {formatAmount(totalShippedMaterials)}
        </Typography>
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Person Wise Ledger</title>
      </Head>
      <PageTitle
        heading={`Viewing Ledger of ${person.name}`}
        subHeading="Find all the transaction recorded to this person"
        sideText="Edit details"
        sideTextLink={`/admin/person/${person._id}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PersonDetails person={person} />
          </Grid>
          <Grid item xs={12}>
            {overview}
          </Grid>
          <Grid item xs={12}>
            {expensesDatagrid}
          </Grid>
          <Grid item xs={12}>
            {ownedMaterialsDatarid}
          </Grid>
          <Grid item xs={12}>
            {shippedMaterialsDatarid}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

PersonIndex.layout = SidebarLayout

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as string
  const result = await getPerson(id)
  if (result === null) {
    return {
      notFound: true,
    }
  }

  const expResult = getExpensesByPerson(id)
  const shipResult = getMaterialsByShipper(id)
  const ownResult = getMaterialsByPerson(id)

  const person = JSON.parse(JSON.stringify(result))
  const expenses = JSON.parse(JSON.stringify((await expResult) || []))
  const shippedMaterials = JSON.parse(JSON.stringify((await shipResult) || []))
  const ownedMaterials = JSON.parse(JSON.stringify((await ownResult) || []))

  return {
    props: {
      person,
      expenses,
      shippedMaterials,
      ownedMaterials,
    },
  }
}

export default PersonIndex
