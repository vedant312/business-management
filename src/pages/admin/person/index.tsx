import { Card, Container, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import { personsColDef } from "src/constants/colDefs"
import { Person } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getPersons } from "src/lib/api/person"

const Persons = ({ rows }: { rows: Person[] }) => (
  <>
    <Head>
      <title>Persons</title>
    </Head>
    <PageTitle
      heading="Persons"
      subHeading="Add, edit, delete and view each person ledger"
      sideText="Add new person"
      sideTextLink="/admin/person/new"
    />
    <Container>
      <Card sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Persons
        </Typography>
        <DataGrid
          columns={personsColDef}
          rows={rows}
          hiddenColumns={["_id", "createdAt", "updatedAt"]}
        />
      </Card>
    </Container>
  </>
)

Persons.layout = SidebarLayout

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const result = await getPersons()
  const rows = JSON.parse(JSON.stringify(result))

  return {
    props: {
      rows,
    },
  }
}

export default Persons
