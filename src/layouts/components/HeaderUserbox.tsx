/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  Popover,
  Typography,
  lighten,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone"

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
`
)

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`
)

const UserBoxText = styled(Box)(
  ({ theme }) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`
)

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${lighten(theme.palette.secondary.main, 0.5)}
`
)

const HeaderUserbox = () => {
  const ref = useRef<any>(null)
  const [isOpen, setOpen] = useState<boolean>(false)
  const [user, setUser] = useState<any>()

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleSignOut = async () => {
    await fetch("/api/logout")
    window.location.href = "/"
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/user")
      const data = await res.json()
      setUser(data)
    }
    getUser()
  }, [])

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        {/* <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem href="/management/profile/details" component={Link}>
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem href="/dashboards/messenger" component={Link}>
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Messenger" />
          </ListItem>
          <ListItem href="/management/profile/settings" component={Link}>
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List> */}
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handleSignOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderUserbox
