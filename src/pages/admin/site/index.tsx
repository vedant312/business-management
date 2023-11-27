import { Card, Container, Typography } from "@mui/material"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"

import DataGrid from "src/components/DataGrid"
import PageTitle from "src/components/PageTitle"
import { siteColDef } from "src/constants/colDefs"
import { Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getSites } from "src/lib/api/site"

const Sites = ({ rows }: { rows: Site[] }) => (
  <>
    <Head>
      <title>Sites</title>
    </Head>
    <PageTitle
      heading="Sites"
      subHeading="Add, edit, delete and view each site ledger"
      sideText="Add new site"
      sideTextLink="/admin/site/new"
    />
    <Container>
      <Card sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sites
        </Typography>
        <DataGrid
          columns={siteColDef}
          rows={rows}
          hiddenColumns={["_id", "createdAt", "updatedAt"]}
        />
      </Card>
    </Container>
  </>
)

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const result = await getSites()
  const rows = JSON.parse(JSON.stringify(result))

  return {
    props: {
      rows,
    },
  }
}

Sites.layout = SidebarLayout

export default Sites
