import { useState } from "react"
import { Box, Button, Container, Grid, Hidden, Typography } from "@mui/material"
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone"
import LoadingButton from "@mui/lab/LoadingButton"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
`
)

const MainContent = styled(Box)(
  () => `
    height: 100vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};
`
)

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
)

const Status500 = () => {
  const [pending, setPending] = useState(false)
  const handleClick = () => {
    setPending(true)
  }

  return (
    <>
      <Head>
        <title>Error 500 Interal Server Error</title>
      </Head>
      <MainContent>
        <Grid
          container
          sx={{ height: "100%" }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <Image
                  alt="500"
                  height={260}
                  src="/static/images/status/500.svg"
                  width={260}
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  There was an error, please try again later
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  The server encountered an internal error and was not able to
                  complete your request
                </Typography>
                <LoadingButton
                  onClick={handleClick}
                  loading={pending}
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshTwoToneIcon />}
                >
                  Refresh view
                </LoadingButton>
                <Button href="/" variant="contained" sx={{ ml: 1 }}>
                  Go back
                </Button>
              </Box>
            </Container>
          </Grid>
          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >
              <Container maxWidth="sm">
                <Box textAlign="center">
                  <TypographyPrimary variant="h1" sx={{ my: 2 }}>
                    Business Management App 💻
                  </TypographyPrimary>
                  <TypographySecondary
                    variant="h4"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                  >
                    A solution for managing business ledger and sites
                    informatics. Made with ❤️ by{" "}
                    <Link href="#">Vedant Dangi</Link>
                  </TypographySecondary>
                  <Button href="/overview" size="large" variant="contained">
                    Overview
                  </Button>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
        </Grid>
      </MainContent>
    </>
  )
}

export default Status500
