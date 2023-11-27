import { Box, Card, Container, Grid, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import { MaterialColDef, expenseColDef } from "src/constants/colDefs"
import { formatAmount } from "src/constants/colDefs/base"
import { Expense, Material, Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getExpensesBySite } from "src/lib/api/expense"
import { getMaterialsBySite } from "src/lib/api/material"
import { getSite } from "src/lib/api/site"
import SiteDetails from "src/views/SiteDetails"

import { getAmount } from "../../material"

interface SiteIndexProps {
  site: Site
  expenses: Expense[]
  materials: Material[]
}

const SiteIndex = ({ site, expenses, materials }: SiteIndexProps) => {
  const totalExpenses = expenses.reduce(
    (a, b) => a + (Number.isNaN(Number(b.amount)) ? 0 : Number(b.amount)),
    0
  )
  const totalMaterials = materials.reduce(
    (a, b) => a + getAmount(b).totalAmount,
    0
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
          hiddenColumns={["site"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Expenses: {formatAmount(totalExpenses)}
        </Typography>
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
          hiddenColumns={["shippingRate", "materialRate", "quantity", "site"]}
        />
        <Typography variant="h4" sx={{ pt: 3 }}>
          Total Material worth: {formatAmount(totalMaterials)}
        </Typography>
      </Box>
    </Card>
  )

  return (
    <>
      <Head>
        <title>Site wise Ledger</title>
      </Head>
      <PageTitle
        heading={`Ledger of the ${site.name} Construction Site`}
        subHeading="Find all the transaction recorded to this site"
        sideText="Edit details"
        sideTextLink={`/admin/site/${site._id}/edit`}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SiteDetails site={site} />
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

SiteIndex.layout = SidebarLayout

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const id = query.id as string
  const result = await getSite(id)
  if (result === null) {
    return {
      notFound: true,
    }
  }

  const expResult = getExpensesBySite(id)
  const matResult = getMaterialsBySite(id)

  const site = JSON.parse(JSON.stringify(result))
  const expenses = JSON.parse(JSON.stringify((await expResult) || []))
  const materials = JSON.parse(JSON.stringify((await matResult) || []))
  return {
    props: {
      site,
      expenses,
      materials,
    },
  }
}

export default SiteIndex
