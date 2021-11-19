import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { Modal } from '../Modal'
import { ConnectionListItem } from './ConnectionListItem'
import theme from '../assets/_styles/theme'

export default {
  title: 'ConnectionListItem',
  component: ConnectionListItem,
}

const Template = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Modal open={true} header>
        <ConnectionListItem {...props} />
        <ConnectionListItem {...props} />
        <ConnectionListItem {...props} />
        <ConnectionListItem {...props} />
        <ConnectionListItem {...props} />
        <ConnectionListItem {...props} />
      </Modal>
    </MuiThemeProvider>
  )
}

export const Defaul = Template.bind({})
Defaul.args = {
  endSession: console.log,
  disconnect: console.log,
  startSession: console.log,
  isActiveSession: true,
  peerMeta: {
    description: 'Swap or provide liquidity on the Uniswap Protocol',
    url: 'https://app.uniswap.org',
    icons: [
      'https://app.uniswap.org/./favicon.png',
      'https://app.uniswap.org/./images/192x192_App_Icon.png',
      'https://app.uniswap.org/./images/512x512_App_Icon.png',
    ],
    name: 'Uniswap Interface',
  },
}
