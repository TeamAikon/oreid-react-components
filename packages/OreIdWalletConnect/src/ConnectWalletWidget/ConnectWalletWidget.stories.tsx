import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { Modal } from '../Modal'
import { ConnectWalletWidget } from './ConnectWalletWidget'
import theme from '../assets/_styles/theme'

export default {
  title: 'ConnectWalletWidget',
  component: ConnectWalletWidget,
}

const Template = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Modal open={true} header>
        <ConnectWalletWidget {...props} />
      </Modal>
    </MuiThemeProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  onClickConect: console.log,
}
