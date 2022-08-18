import React from 'react'
import { ConnectButton } from './ConnectButton'

export default {
  title: 'ConnectButton',
  component: ConnectButton,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ConnectButton {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  hideWhenNoConnections: false,
}
