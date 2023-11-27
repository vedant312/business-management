import { ArrowBack, OpenInNew } from "@mui/icons-material"
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
import { Expense } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"
import { getExpense } from "src/lib/api/expense"
import numWords from "src/lib/words"

interface ExpenseIndexProps {
  expense: Expense
}

const ExpenseIndex = ({ expense }: ExpenseIndexProps) => {
  const props = {
    fullWidth: true,
    inputProps: {
      readOnly: true,
    },
  }

  return (
    <>
      <Head>
        <title>View Expense</title>
      </Head>
      <PageTitle
        heading="View Expense"
        subHeading="View expense from database"
        sideText="Edit this expense"
        sideTextLink={`/admin/expense/edit?id=${expense._id}`}
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
                <Typography variant="h4">View a expense</Typography>
                <Grid container spacing={2} my={1}>
                  <Grid item xs={12} md={4}>
                    <DatePicker
                      readOnly
                      label="Date of Expense"
                      value={expense.date}
                      inputFormat="d MMM yyyy"
                      onChange={(e) => null}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Expense Subject"
                      name="subject"
                      value={expense.subject}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="payment-mode">
                        Payment Mode
                      </InputLabel>
                      <Select
                        readOnly
                        id="payment-mode"
                        value={expense.mode}
                        name="mode"
                        label="Payemnt Mode"
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="UPI">UPI</MenuItem>
                        <MenuItem value="INB">INB</MenuItem>
                        <MenuItem value="DD">DD</MenuItem>
                        <MenuItem value="ATM">ATM</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Expense Amount (in ₹)"
                      name="amount"
                      value={numWords(expense.amount)}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="Remarks"
                      name="remarks"
                      value={expense.remarks}
                      multiline
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={10} md={4}>
                    <TextField
                      label="Site Name"
                      name="site"
                      value={expense.site?.name || "NA"}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    {expense.site?._id && (
                      <IconButton href={`/admin/site/${expense.site?._id}`}>
                        <OpenInNew color="disabled" />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={10} md={4}>
                    <TextField
                      label="Person Name"
                      value={expense.person?.name || "NA"}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    {expense.person?._id && (
                      <IconButton href={`/admin/person/${expense.person?._id}`}>
                        <OpenInNew color="disabled" />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Created At"
                      name="createdAt"
                      value={new Date(expense.createdAt).toLocaleString()}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Expense ID"
                      name="_id"
                      value={expense._id}
                      {...props}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Updated At"
                      name="updatedAt"
                      value={new Date(expense.updatedAt).toLocaleString()}
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

ExpenseIndex.layout = SidebarLayout

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

  const result = await getExpense(id)
  if (result === null) return { notFound: true }

  const expense = JSON.parse(JSON.stringify(result))
  return {
    props: {
      expense,
    },
  }
}

export { getServerSideProps }
export default ExpenseIndex
