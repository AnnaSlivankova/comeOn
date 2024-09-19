import { forwardRef } from 'react'

import { Icon, IconifyIcon } from '@iconify/react'
import Box, { BoxProps } from '@mui/material/Box'

// ----------------------------------------------------------------------

type IconifyProps = IconifyIcon | string

interface Props extends BoxProps {
  icon: IconifyProps
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, sx, width = 20, ...other }, ref) => (
  <Box
    className={'component-iconify'}
    component={Icon}
    icon={icon}
    ref={ref}
    sx={{ height: width, width, ...sx }}
    {...other}
  />
))

export default Iconify
