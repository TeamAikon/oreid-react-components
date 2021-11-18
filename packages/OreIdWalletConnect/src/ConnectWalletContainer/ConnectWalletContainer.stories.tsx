import React, { useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { Modal } from '../Modal'
import { ConnectWalletContainer } from './ConnectWalletContainer'
import theme from '../assets/_styles/theme'
import { ChainNetwork, WalletConnectRef } from '../types'

export default {
  title: 'ConnectWalletContainer',
  component: ConnectWalletContainer,
}

const ConnectWalletContainerExample = (props: any) => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <MuiThemeProvider theme={theme}>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ConnectWalletContainer {...props} />
        </Modal>
      </MuiThemeProvider>
    </>
  )
}

const Template = (props: any) => {
  return <ConnectWalletContainerExample {...props} />
}

export const Defaul = Template.bind({})
Defaul.args = {
  config: {
    chainNetwork: ChainNetwork.EthMain,
    account: '0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b',
  },
  createConnection: (walletConnectRef: WalletConnectRef) => {
    console.log('createConnection: ', JSON.stringify(walletConnectRef.connector.session))
  },
  onSessionRequest: (...args) => console.log('onSessionRequest', args),
  onConnect: (...args) => console.log('onConnect', args),
  onDisconnect: (...args) => console.log('onDisconnect', args),
  onError: (...args) => console.log('onError', args),
}
