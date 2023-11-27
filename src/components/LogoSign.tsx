import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

const LogoWrapper = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    display: flex;
    text-decoration: none;
    width: 53px;
    margin: 0 auto;
    font-weight: ${theme.typography.fontWeightBold};
    align-items: center;
    justify-content: center;
    `
)

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}))

const Logo = () => (
  <TooltipWrapper title="Pole Star Enterprises" arrow>
    <LogoWrapper href="/">
      <Image
        alt="logo"
        src="/static/images/logo.svg"
        width={110}
        height={110}
      />
    </LogoWrapper>
  </TooltipWrapper>
)

export default Logo
