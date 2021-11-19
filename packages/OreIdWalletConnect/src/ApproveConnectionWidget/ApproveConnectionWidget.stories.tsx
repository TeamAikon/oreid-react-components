import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { Modal } from '../Modal'
import { ApproveConnectionWidget } from './ApproveConnectionWidget'
import theme from '../assets/_styles/theme'

export default {
  title: 'ApproveConnectionWidget',
  component: ApproveConnectionWidget,
}

const Template = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Modal open={true} header>
        <ApproveConnectionWidget {...props} />
      </Modal>
    </MuiThemeProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  approveSessionRequest: () => console.log('approveSessionRequest'),
  declineSessionRequest: () => console.log('declineSessionRequest'),
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
  address: '0x4ca9e22e3b7629fffbd4f28c0171932d8200609b ',
}
