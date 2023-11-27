import { FC } from "react"
import PropTypes from "prop-types"
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone"
import { Button, Grid, Typography } from "@mui/material"

import PageTitleWrapper from "./PageTitleWrapper"

interface PageTitleProps {
  heading?: string
  subHeading?: string
  sideText?: string
  sideTextLink?: string
}

const PageTitle: FC<PageTitleProps> = ({
  heading = "",
  subHeading = "",
  sideText = "",
  sideTextLink = "",
  ...rest
}) => (
  <PageTitleWrapper>
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      {sideText && sideTextLink && (
        <Grid item>
          <Button
            href={sideTextLink}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {sideText}
          </Button>
        </Grid>
      )}
    </Grid>
  </PageTitleWrapper>
)

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  sideText: PropTypes.string,
  sideTextLink: PropTypes.string,
}

export default PageTitle
