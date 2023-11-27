import { Container, Grid } from "@mui/material"
import Head from "next/head"
import { GetServerSidePropsContext } from "next"
import { withIronSessionSsr } from "iron-session/next"

import DailyExpenses from "src/views/index/DailyExpenses"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import PageHeader from "src/views/index/PageHeader"
import SidebarLayout from "src/layouts/SidebarLayout"
import QuickActions from "src/views/index/QuickActions"
import { getDailyExpenses } from "src/lib/api/expense"
import { ironOptions } from "src/lib/config"
import { getUser } from "src/lib/api/user"
import { Expense } from "src/constants/models"

interface AdminIndexProps {
  userid: string
  expenses: Expense[]
}

const AdminIndex = ({ userid, expenses }: AdminIndexProps) => {
  const amount = {
    cash: 0,
    upi: 0,
    other: 0,
  }

  expenses.forEach((expense) => {
    switch (expense.mode) {
      case "Cash":
        amount.cash += Number(expense.amount) || 0
        break
      case "UPI":
        amount.upi += Number(expense.amount) || 0
        break
      default:
        amount.other += Number(expense.amount) || 0
    }
  })

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader userid={userid} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <DailyExpenses {...amount} />
          </Grid>
          <Grid item xs={12}>
            <QuickActions />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

AdminIndex.layout = SidebarLayout

const getServerSidePropsHandler = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  )

  const { user } = req.session

  let date = new Date(new Date().setHours(0, 0, 0, 0))
  const expResult = getDailyExpenses(date)

  const expenses = JSON.parse(JSON.stringify(await expResult))

  return {
    props: {
      userid: user?.name,
      expenses,
    },
  }
}

const getServerSideProps = withIronSessionSsr(
  getServerSidePropsHandler,
  ironOptions
)

export { getServerSideProps }
export default AdminIndex
