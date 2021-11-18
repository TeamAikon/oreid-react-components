import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { Modal } from '../Modal'
import { RequestWidget } from './RequestWidget'
import theme from '../assets/_styles/theme'

export default {
  title: 'RequestWidget',
  component: RequestWidget,
}

const Template = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Modal open={true}>
        <RequestWidget {...props} />
      </Modal>
    </MuiThemeProvider>
  )
}

export const Defaul = Template.bind({})
Defaul.args = {
  request: {
    id: 1636687046318467,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [
      {
        gas: '0x2a6fd',
        value: '0x13fbe85edc90000',
        from: '0x7ffbf659a640e181ba2db633686af123e9e1ee1b',
        to: '0xe592427a0aece92de3edee1f18e0157c05861564',
        data:
          '0x414bf389000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000001f40000000000000000000000007ffbf659a640e181ba2db633686af123e9e1ee1b00000000000000000000000000000000000000000000000000000000618de3c3000000000000000000000000000000000000000000000000013fbe85edc900000000000000000000000000000000000000000000000000172f0100a86065567d0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
  },
  peerMeta: {
    description: 'Swap or provide liquidity on the Uniswap Protocol',
    url: 'https://app.uniswap.org',
    icons: [
      'https://app.uniswap.org/./favicon.png',
      'https://app.uniswap.org/./images/192x192_App_Icon.png',
      'https://app.uniswap.org/./images/512x512_App_Icon.png',
    ],
    name: 'Uniswap',
  },
  onAcceptRequest: console.log,
}
