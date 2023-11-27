import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import Head from "next/head"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import moment from "moment"
import { GetServerSidePropsContext } from "next"

import SidebarLayout from "src/layouts/SidebarLayout"
import PageTitle from "src/components/PageTitle"
import DataGrid from "src/components/DataGrid"
import { Expense, Material } from "src/constants/models"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { getDailyExpenses } from "src/lib/api/expense"
import { getDailyMaterials } from "src/lib/api/material"

import { getAmount } from "./material"

interface DailyExpensesProps {
  date: string
  expenses: Expense[]
  materials: Material[]
}

const getTotalAmount = (material: Material) => getAmount(material).totalAmount

const DailyExpenses = ({ date, expenses, materials }: DailyExpensesProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(date))

  const totalExpenses = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount) || 0,
    0
  )

  const totalMaterials = materials.reduce(
    (acc, curr) => acc + getTotalAmount(curr),
    0
  )

  const dateSelector = (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box py={3} px={4}>
            <Typography variant="h4">
              {selectedDate.toDateString() === new Date().toDateString()
                ? "Today"
                : moment(selectedDate).format("D MMM")}
              's Expenses
            </Typography>
            <Typography color="text.secondary">
              Here are all expenses of {selectedDate.toDateString()}.{" "}
            </Typography>
            <Typography variant="h3" sx={{ pt: 2 }}>
              Total Expenses: ₹{totalExpenses.toLocaleString()}
            </Typography>
            <Typography color="text.secondary">
              Total materials worth of ₹{totalMaterials.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box px={4} py={3}>
            <Typography variant="h5" fontWeight="normal" color="text.secondary">
              If you want to change date, select a date below.
            </Typography>
            <Box pt={2} alignItems="center" justifyContent="center">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} alignContent="center">
                  <DatePicker
                    label="Pick a date"
                    value={selectedDate}
                    onChange={(newDate) => {
                      setSelectedDate(newDate || new Date())
                    }}
                    inputFormat="d MMM yyyy"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="text"
                    color="primary"
                    fullWidth
                    href={`?date=${moment(selectedDate).format("YYYY-MM-DD")}`}
                  >
                    Fetch Data
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
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
          hiddenColumns={["createdAt", "updatedAt", "_id"]}
        />
      </Box>
    </Card>
  )

  const materialsDatagrid = (
    <Card>
      <Box p={4}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          All Material
        </Typography>
        <DataGrid
          rows={materials}
          columns={MaterialColDef}
          hiddenColumns={[
            "_id",
            "createdAt",
            "updatedAt",
            "date",
            "materialRate",
            "shippingRate",
            "quantity",
          ]}
        />
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Daily Expenses</title>
      </Head>
      <PageTitle
        heading="Daily Expenses"
        subHeading="Here are all daily expenses added so far!"
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
            {dateSelector}
          </Grid>
          <Grid item xs={12}>
            {expensesDatagrid}
          </Grid>
          <Grid item xs={12}>
            {materialsDatagrid}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

DailyExpenses.layout = SidebarLayout

const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  let date = new Date(new Date().setHours(0, 0, 0, 0))

  if (query.date) {
    date = new Date(new Date(query.date as string).setHours(0, 0, 0, 0))
  }

  const expResult = getDailyExpenses(date)
  const matResult = getDailyMaterials(date)

  const expenses = JSON.parse(JSON.stringify((await expResult) || []))
  const materials = JSON.parse(JSON.stringify((await matResult) || []))

  return {
    props: {
      date: date.toISOString(),
      expenses,
      materials,
    },
  }
}

export { getServerSideProps }
export default DailyExpenses
