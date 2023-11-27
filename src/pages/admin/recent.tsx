import { Card, Container, Grid, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import SidebarLayout from "src/layouts/SidebarLayout"
import { Expense, Material, Person, Site } from "src/constants/models"
import { getRecentExpenses } from "src/lib/api/expense"
import { getRecentMaterial } from "src/lib/api/material"
import { getRecentPersons } from "src/lib/api/person"
import { getRecentSites } from "src/lib/api/site"
import {
  MaterialColDef,
  expenseColDef,
  personsColDef,
  siteColDef,
} from "src/constants/colDefs"

interface RecentProps {
  expenses: Expense[]
  materials: Material[]
  persons: Person[]
  sites: Site[]
}

const Recent = ({ expenses, materials, persons, sites }: RecentProps) => (
  <>
    <Head>
      <title>Recent Activity</title>
    </Head>
    <PageTitle
      heading="Recent Activity"
      subHeading="Trace history of last 10 updated entries"
    />
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Recent Expenses
            </Typography>
            <DataGrid columns={expenseColDef} rows={expenses} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Recent Materials
            </Typography>
            <DataGrid columns={MaterialColDef} rows={materials} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Recent Persons
            </Typography>
            <DataGrid columns={personsColDef} rows={persons} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Recent Sites
            </Typography>
            <DataGrid columns={siteColDef} rows={sites} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  </>
)

Recent.layout = SidebarLayout

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const expResult = getRecentExpenses(15)
  const matResult = getRecentMaterial(15)
  const perResult = getRecentPersons(10)
  const siteResult = getRecentSites(10)

  const expenses = JSON.parse(JSON.stringify((await expResult) || []))
  const materials = JSON.parse(JSON.stringify((await matResult) || []))
  const persons = JSON.parse(JSON.stringify((await perResult) || []))
  const sites = JSON.parse(JSON.stringify((await siteResult) || []))

  return {
    props: {
      expenses,
      materials,
      persons,
      sites,
    },
  }
}

export default Recent
