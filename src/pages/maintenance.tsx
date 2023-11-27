import {
  Box,
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
      <title>Under Maintenance</title>
    </Head>
    <MainContent>
      <Container maxWidth="md">
        <Logo />
        <Box textAlign="center">
          <Container maxWidth="xs">
            <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
              The site is currently down for maintenance
            </Typography>
            <Typography
              variant="h3"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              We apologize for any inconveniences caused
            </Typography>
          </Container>
          <Image
            alt="Maintenance"
            height={250}
            src="/static/images/status/maintenance.svg"
            width={350}
          />
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
