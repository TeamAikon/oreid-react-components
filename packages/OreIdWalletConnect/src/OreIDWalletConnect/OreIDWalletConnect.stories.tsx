import React, { useState, useEffect } from 'react'
import { useModalConnections } from '../hooks'
import { Connection, ChainNetwork, ModalConnections, OreIDWalletConnectProps } from '../types'
import { OreIDWalletConnect } from './OreIDWalletConnect'

export default {
  title: 'OreIDWalletConnect',
  component: OreIDWalletConnect,
}

const Started: Connection[] = []

const OreIDWalletConnectExample: React.FC = (props: any) => {
  const [connections, setConnections] = useState<Connection[]>(Started)
  const [modalConnections, setModalConnections] = useModalConnections()

  useEffect(() => {
    console.log('\n\n')
    console.log('Debug: ', connections)
    console.log(JSON.stringify(connections))
    console.log('\n\n')
  }, [connections])

  return (
    <>
      <button onClick={() => setModalConnections(ModalConnections.NewConnection)}>External Application Action</button>
      <br />
      <br />
      <OreIDWalletConnect
        {...props}
        config={props.config}
        connections={connections}
        setConnections={setConnections}
        modalConnections={modalConnections}
        setModalConnections={setModalConnections}
        onAcceptRequest={(request, connection) => {
          console.log('onAcceptRequest')
          console.log({ request, connection })
          console.log(JSON.stringify(request))
        }}
        onSessionRequest={(connection, payload) => {
          // optional
          console.log('onSessionRequest', { payload })
        }}
        onSessionUpdate={(connection, payload) => {
          // optional
          console.log('onSessionUpdate', { payload })
        }}
        onConnectionCreate={(connection, payload) => {
          // optional
          console.log('onConnectionCreate', { connection, payload })
        }}
        onConnectionDelete={(connection, payload) => {
          // optional
          console.log('onConnectionDelete', { payload })
        }}
        onError={(eventName, error, connection) => {
          // optional
          console.log('onError', { eventName })
          console.log('error: ', { error })
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
  hideWhenNoConnections: false,
  config: {
    chainNetwork: ChainNetwork.EthMain,
    account: '0x7362A91D36382fC14dAEF0eDD2Ebd9437DD812e7',
    clientName: 'OREID WalletConnect',
    clientDescription: 'OREID React Component WalletConnect',
    clientIcons: ['https://storage.googleapis.com/oreid-files/partners/aikon-logo.png'],
    clientUrl: 'https://github.com/TeamAikon/oreid-react-components',
  },
}
