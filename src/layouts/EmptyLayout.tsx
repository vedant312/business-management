import { FC, ReactNode } from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"

interface BaseLayoutProps {
  children?: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => (
  <Box
    sx={{
      flex: 1,
      height: "100%",
    }}
  >
    {children}
  </Box>
)

BaseLayout.propTypes = {
  children: PropTypes.node,
}

export default BaseLayout
