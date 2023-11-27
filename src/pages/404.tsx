import { Box, Button, Card, Container, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import Head from "next/head"

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100vh;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(30)}px;
`
)

const Status404 = () => (
  <>
    <Head>
      <title>Error 404 Page Not Found</title>
    </Head>
    <MainContent>
      <Container maxWidth="md">
        <Box textAlign="center">
          <Image
            alt="404"
            height={180}
            src="/static/images/status/404.svg"
            width={330}
          />
          <Typography variant="h2" sx={{ my: 2 }}>
            The page you were looking for doesn&apos;t exist.
          </Typography>
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{ mb: 4 }}
          >
            It&apos;s on us, we moved the content to a different page. The
            search below should help!
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
            {/* <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                type="text"
                placeholder="Search terms here..."
                endAdornment={
                  <InputAdornment position="end">
                    <ButtonSearch variant="contained" size="small">
                      Search
                    </ButtonSearch>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Divider sx={{ my: 4 }}>OR</Divider> */}
            <Button href="/" variant="outlined">
              Go to homepage
            </Button>
          </Card>
        </Container>
      </Container>
    </MainContent>
  </>
)

export default Status404
