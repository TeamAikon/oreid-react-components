import React, { useState, useEffect } from 'react'
import { Connection, ModalConnections } from '../types'
import { OreIDWalletConnect } from './OreIDWalletConnect'
import { restoreSession, storeSession } from '../sessions'

export default {
  title: 'OreIDWalletConnect',
  component: OreIDWalletConnect,
}

// const InitialConection: StoreConnection[] = [
// 	{
// 		session: {
// 			connected: true,
// 			accounts: ["0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b"],
// 			chainId: 1,
// 			bridge: "https://k.bridge.walletconnect.org",
// 			key: "34372548282feb5c79043d28b2156b9a84a38bb3097d597b782957e8eacaa3fd",
// 			clientId: "55149ada-caf8-4569-bbc7-820be90d65f5",
// 			clientMeta: {
// 				description: "",
// 				url: "http://localhost:6007",
// 				icons: [],
// 				name: "Storybook",
// 			},
// 			peerId: "f7f69279-5f68-4634-adbf-5c8dd84390dc",
// 			peerMeta: {
// 				description: "Swap or provide liquidity on the Uniswap Protocol",
// 				url: "https://app.uniswap.org",
// 				icons: [
// 					"https://app.uniswap.org/./favicon.png",
// 					"https://app.uniswap.org/./images/192x192_App_Icon.png",
// 					"https://app.uniswap.org/./images/512x512_App_Icon.png",
// 				],
// 				name: "Uniswap Interface",
// 			},
// 			handshakeId: 1636493595121004,
// 			handshakeTopic: "53ecf22b-d01a-4757-8e53-78ec99f3b2de",
// 		},
// 		listening: true,
// 		uri:
// 			"wc:53ecf22b-d01a-4757-8e53-78ec99f3b2de@1?bridge=https%3A%2F%2Fk.bridge.walletconnect.org&key=34372548282feb5c79043d28b2156b9a84a38bb3097d597b782957e8eacaa3fd",
// 	},
// ];
// const Started = InitialConection.map(restoreSession);
const Started = []

const OreIDWalletConnectExample: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>(Started)
  const [modalConnections, setModalConnections] = useState<ModalConnections>(ModalConnections.Closed)

  useEffect(() => {
    console.log('\n\n')
    console.log('Debug: ', connections)
    // console.log(JSON.stringify(connections.map(storeSession)));
    console.log('\n\n')
  }, [connections])

  return (
    <>
      <button onClick={() => setModalConnections(ModalConnections.NewConnection)}>Open Connections Modal</button>
      <OreIDWalletConnect
        config={{
          chainId: 1,
          accounts: ['0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b'],
        }}
        connections={connections}
        setConnections={setConnections}
        modalConnections={modalConnections}
        setModalConnections={setModalConnections}
        onSessionRequest={(connection, payload) => {
          console.log('onSessionRequest', { payload })
        }}
        onSessionUpdate={(connection, payload) => {
          console.log('onSessionUpdate', { payload })
        }}
        onConnect={(connection, payload) => {
          console.log('onConnect', { payload })
        }}
        onStartListening={(connection, payload) => {
          console.log('onStartListening', { payload })
        }}
        onRequest={(conection, payload) => {
          console.log('OnRequest')
          console.log({ conection }, { payload })
        }}
        onStopListening={(connection, payload) => {
          console.log('onStopListening', { payload })
        }}
        onDisconnect={(connection, payload) => {
          console.log('onDisconnect', { payload })
        }}
        onError={(eventName, error, connection) => {
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
