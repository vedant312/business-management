import { useContext } from "react"
import {
  Box,
  Button,
  List,
  ListItem,
  ListSubheader,
  alpha,
  styled,
} from "@mui/material"
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone"
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone"
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone"
import LocationCircleTwoToneIcon from "@mui/icons-material/LocationCity"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import PaymentIcon from "@mui/icons-material/Payment"
import { History } from "@mui/icons-material"

import { SidebarContext } from "src/contexts/SidebarContext"

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      padding: ${theme.spacing(1)};

      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
)

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
)

const SidebarMenu = () => {
  const { closeSidebar } = useContext(SidebarContext)

  return (
    <MenuWrapper>
      <List component="div">
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin"
                startIcon={<FilterVintageTwoToneIcon />}
              >
                Overview
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Add Expenses
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/expense/new"
                startIcon={<PaymentIcon />}
              >
                Add Expense
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/material/new"
                startIcon={<LocalShippingIcon />}
              >
                Add Material
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Daily View
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/daily"
                startIcon={<TableChartTwoToneIcon />}
              >
                Daily Expenses
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Accounts
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/sites"
                startIcon={<LocationCircleTwoToneIcon />}
              >
                Site wise Expenses
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/persons"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                Person Wise Expenses
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            History
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                onClick={closeSidebar}
                href="/admin/recent"
                startIcon={<History />}
              >
                Recent Activity
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </MenuWrapper>
  )
}

export default SidebarMenu