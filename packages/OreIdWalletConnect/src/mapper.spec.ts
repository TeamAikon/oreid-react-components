import { mapConnectionToWalletConnectRefSession, mapWalletConnectRefToConnection } from './mapper'
import { ChainNetwork } from './types'

it('convert WalletConnectRef To Connection', () => {
  const session = {
    connected: true,
    accounts: ['0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b'],
    chainId: 1,
    bridge: 'https://z.bridge.walletconnect.org',
    key: '791d8f450954a57102d39320639471accdc4fde6fd89fffe1fcf421e2ce138c2',
    clientId: 'c236d0fc-3584-4c0d-abe4-680dceee290b',
    clientMeta: { description: '', url: 'http://localhost:6007', icons: [], name: 'Storybook' },
    peerId: 'd4a9a4e2-b8eb-4d5d-9b10-7ce2db50c78b',
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
    handshakeId: 1637183452267460,
    handshakeTopic: 'f54bd9e0-7972-45bf-a3b4-5fddc3d078e2',
  }
  const connection = mapWalletConnectRefToConnection({
    connector: { session, uri: 'connection-uri-test' },
  } as any)
  expect(connection).toEqual({
    bridge: 'https://z.bridge.walletconnect.org',
    chainNetwork: 'eth_main',
    connectionUri: 'connection-uri-test',
    handshakeId: '1637183452267460',
    handshakeTopic: 'f54bd9e0-7972-45bf-a3b4-5fddc3d078e2',
    key: '791d8f450954a57102d39320639471accdc4fde6fd89fffe1fcf421e2ce138c2',
    name: 'Uniswap Interface',
    peerId: 'd4a9a4e2-b8eb-4d5d-9b10-7ce2db50c78b',
    peerUrl: 'https://app.uniswap.org',
    description: 'Swap or provide liquidity on the Uniswap Protocol',
    logoUrl: 'https://app.uniswap.org/./images/512x512_App_Icon.png',
    clientId: 'c236d0fc-3584-4c0d-abe4-680dceee290b',
  })
})

it('convert Connection To WalletConnectRef', () => {
  const connection = mapConnectionToWalletConnectRefSession(
    {
      bridge: 'https://z.bridge.walletconnect.org',
      chainNetwork: 'eth_main',
      connectionUri: 'connection-uri-test',
      handshakeId: '1637183452267460',
      handshakeTopic: 'f54bd9e0-7972-45bf-a3b4-5fddc3d078e2',
      key: '791d8f450954a57102d39320639471accdc4fde6fd89fffe1fcf421e2ce138c2',
      name: 'Uniswap Interface',
      peerId: 'd4a9a4e2-b8eb-4d5d-9b10-7ce2db50c78b',
      peerUrl: 'https://app.uniswap.org',
      description: 'Swap or provide liquidity on the Uniswap Protocol',
      logoUrl: 'https://app.uniswap.org/./images/512x512_App_Icon.png',
      clientId: 'c236d0fc-3584-4c0d-abe4-680dceee290b',
    },
    {
      account: '0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b',
      chainNetwork: ChainNetwork.EthMain,
      clientDescription: 'clientDescription',
      clientIcons: ['clientIcons'],
      clientUrl: 'clientUrl',
      clientName: 'clientName',
    },
  )

  expect(connection).toEqual({
    connected: true,
    accounts: ['0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b'],
    chainId: 1,
    bridge: 'https://z.bridge.walletconnect.org',
    key: '791d8f450954a57102d39320639471accdc4fde6fd89fffe1fcf421e2ce138c2',
    clientId: 'c236d0fc-3584-4c0d-abe4-680dceee290b',
    clientMeta: { description: 'clientDescription', url: 'clientUrl', icons: ['clientIcons'], name: 'clientName' },
    peerId: 'd4a9a4e2-b8eb-4d5d-9b10-7ce2db50c78b',
    peerMeta: {
      description: 'Swap or provide liquidity on the Uniswap Protocol',
      url: 'https://app.uniswap.org',
      icons: ['https://app.uniswap.org/./images/512x512_App_Icon.png'],
      name: 'Uniswap Interface',
    },
    handshakeId: 1637183452267460,
    handshakeTopic: 'f54bd9e0-7972-45bf-a3b4-5fddc3d078e2',
  })
})
