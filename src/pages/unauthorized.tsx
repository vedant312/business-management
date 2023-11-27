import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import Image from "next/image"
import Head from "next/head"

import Logo from "src/components/LogoSign"

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

const StatusMaintenance = () => (
  <>
    <Head>
      <title>Logged out</title>
    </Head>
    <MainContent>
      <Container maxWidth="md">
        <Logo />
        <Box textAlign="center">
          <Container maxWidth="md">
            <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
              Your login expired, please login again
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              You tried so hard and got so far <br />
              But in the end it doesn't even matter <br />
              Cause you're loogged out
            </Typography>
          </Container>
          <Image
            alt="Maintenance"
            height={150}
            src="/static/images/status/maintenance.svg"
            width={200}
          />
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" sx={{ m: 1 }} href="/login">
            Login
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography component="span" variant="subtitle1">
              Phone:{" "}
            </Typography>
            <Typography
              component="span"
              variant="subtitle1"
              color="text.primary"
            >
              (+ 91) 1888 555 444
            </Typography>
          </Box>
          <Box>
            <Tooltip arrow placement="top" title="Facebook">
              <IconButton color="primary">
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="top" title="Twitter">
              <IconButton color="primary">
                <TwitterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="top" title="Instagram">
              <IconButton color="primary">
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </MainContent>
  </>
)

export default StatusMaintenance
