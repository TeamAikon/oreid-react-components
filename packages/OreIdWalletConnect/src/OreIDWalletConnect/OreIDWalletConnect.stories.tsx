import React, { useState, useEffect } from 'react'
import { useModalConnections } from '../hooks'
import { Connection, ModalConnections, ChainNetwork } from '../types'
import { OreIDWalletConnect } from './OreIDWalletConnect'

export default {
  title: 'OreIDWalletConnect',
  component: OreIDWalletConnect,
}

const Started: Connection[] = []

const OreIDWalletConnectExample: React.FC = () => {
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
        config={{
          chainNetwork: ChainNetwork.EthMain,
          account: '0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b',
        }}
        connections={connections}
        setConnections={setConnections}
        modalConnections={modalConnections}
        setModalConnections={setModalConnections}
        onAcceptRequest={(request) => {
          console.log('onAcceptRequest')
          console.log({ request })
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
        onConnect={(connection, payload) => {
          // optional
          console.log('onConnect', { payload })
        }}
        onStartListening={(connection, payload) => {
          // optional
          console.log('onStartListening', { payload })
        }}
        onStopListening={(connection, payload) => {
          // optional
          console.log('onStopListening', { payload })
        }}
        onDisconnect={(connection, payload) => {
          // optional
          console.log('onDisconnect', { payload })
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

const Template = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <OreIDWalletConnectExample />
    </div>
  )
}

export const Defaul = Template.bind({})
