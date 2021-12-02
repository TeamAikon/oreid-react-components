import React, { useState, useEffect } from 'react'
import { useModalConnections } from '../hooks'
import { Connection, ChainNetwork, OreIDWalletConnectProps } from '../types'
import { OreIDWalletConnectErrorBoundary } from './OreIDWalletConnectErrorBoundary'

export default {
  title: 'OreIDWalletConnectErrorBoundary',
  component: OreIDWalletConnectErrorBoundary,
}

const Started: Connection[] = []

const OreIDWalletConnectExample: React.FC = (props: any) => {
  const [connections, setConnections] = useState<Connection[]>(Started)
  const [modalConnections, setModalConnections] = useModalConnections()

  return (
    <>
      <OreIDWalletConnectErrorBoundary
        config={props.config}
        connections={connections}
        setConnections={setConnections}
        modalConnections={modalConnections}
        setModalConnections={setModalConnections}
        onAcceptRequest={() => {
          console.log('onAcceptRequest')
        }}
        onControllerError={(error, errorInfo) => {
          console.log(error, errorInfo)
        }}
      />
    </>
  )
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <OreIDWalletConnectExample {...props} />
    </div>
  )
}

export const Default: { args: Partial<OreIDWalletConnectProps> } = Template.bind({})
Default.args = {
  config: {
    chainNetwork: ChainNetwork.EthRinkeby,
    account: '0x7362A91D36382fC14dAEF0eDD2Ebd9437DD812e7',
    clientName: '',
    clientDescription: '',
    clientIcons: ['https://storage.googleapis.com/oreid-files/partners/aikon-logo.png'],
    clientUrl: 'https://github.com/TeamAikon/oreid-react-components',
  },
}
