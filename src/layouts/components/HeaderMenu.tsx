/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material"
import { useRef, useState } from "react"
import { styled } from "@mui/material/styles"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"
import Link from "next/link"

import links from "src/constants/quickLinks"

const ListWrapper = styled(Box)(
  ({ theme }) => `
          .MuiTouchRipple-root {
              display: none;
          }
          
          .MuiListItem-root {
              transition: ${theme.transitions.create(["color", "fill"])};
              
              &.MuiListItem-indicators {
                  padding: ${theme.spacing(1, 2)};
              
                  .MuiListItemText-root {
                      .MuiTypography-root {
                          &:before {
                              height: 4px;
                              width: 22px;
                              opacity: 0;
                              visibility: hidden;
                              display: block;
                              position: absolute;
                              bottom: -10px;
                              transition: all .2s;
                              border-radius: ${theme.general.borderRadiusLg};
                              content: "";
                              background: ${theme.colors.primary.main};
                          }
                      }
                  }
  
                  &.active,
                  &:active,
                  &:hover {
                  
                      background: transparent;
                  
                      .MuiListItemText-root {
                          .MuiTypography-root {
                              &:before {
                                  opacity: 1;
                                  visibility: visible;
                                  bottom: 0px;
                              }
                          }
                      }
                  }
              }
          }
  `
)

const HeaderMenu = () => {
  const ref = useRef<any>(null)
  const xsRef = useRef<any>(null)
  const [isOpen, setOpen] = useState<boolean>(false)
  const [xsIsOpen, setXsOpen] = useState<boolean>(false)

  const handleOpen = (type: "xs" | "md") => () => {
    if (type === "xs") {
      setXsOpen(true)
    }
    if (type === "md") {
      setOpen(true)
    }
  }

  const handleClose = (type: "xs" | "md") => () => {
    if (type === "xs") {
      setXsOpen(false)
    }
    if (type === "md") {
      setOpen(false)
    }
  }

  const linksElement = links.map((link) => (
    <Link key={link.src} href={link.src}>
      <MenuItem sx={{ px: 3 }}>{link.title}</MenuItem>
    </Link>
  ))

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <ListWrapper>
          <List disablePadding component={Box} display="flex">
            <Link href="/admin/expense/new">
              <ListItem classes={{ root: "MuiListItem-indicators" }}>
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary="New Expense"
                />
              </ListItem>
            </Link>
            <Link href="/admin/material/new">
              <ListItem classes={{ root: "MuiListItem-indicators" }}>
                <ListItemText
                  primaryTypographyProps={{ noWrap: true }}
                  primary="New Material"
                />
              </ListItem>
            </Link>
            <ListItem
              classes={{ root: "MuiListItem-indicators" }}
              ref={ref}
              onClick={handleOpen("md")}
            >
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={
                  <Box display="flex" alignItems="center">
                    Others
                    <Box display="flex" alignItems="center" pl={0.3}>
                      <ExpandMoreTwoToneIcon fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </ListWrapper>
        <Menu anchorEl={ref.current} onClose={handleClose("md")} open={isOpen}>
          {linksElement}
        </Menu>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <ListWrapper>
          <List disablePadding component={Box} display="flex">
            <ListItem
              classes={{ root: "MuiListItem-indicators" }}
              ref={xsRef}
              onClick={handleOpen("xs")}
            >
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={
                  <Box display="flex" alignItems="center">
                    Quick Links
                    <Box display="flex" alignItems="center" pl={0.3}>
                      <ExpandMoreTwoToneIcon fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </ListWrapper>
        <Menu
          anchorEl={xsRef.current}
          onClose={handleClose("xs")}
          open={xsIsOpen}
        >
          <Link href="/admin/expense/new">
            <MenuItem sx={{ px: 3 }}>New Expense</MenuItem>
          </Link>
          <Link href="/admin/material/new">
            <MenuItem sx={{ px: 3 }}>New Material</MenuItem>
          </Link>
          {linksElement}
        </Menu>
      </Box>
    </>
  )
}

export default HeaderMenu
