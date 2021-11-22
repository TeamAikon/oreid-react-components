import WalletConnectClient from '@walletconnect/client'
import { ChainNetwork, Connection, WalletConnectRef, OreIDWalletConnectConfig } from './types'

export const mapWalletConnectRefToConnection = (connection: WalletConnectRef): Connection => {
  const { chainId, ...session } = connection.connector.session
  return {
    name: session?.peerMeta?.name || '',
    description: session.peerMeta?.description || '',
    logoUrl: session.peerMeta?.icons?.[session.peerMeta?.icons.length - 1] || '',
    peerUrl: session.peerMeta?.url || '',
    connectionUri: connection.connector.uri,
    chainNetwork: mapChainIdToChainNetwork(chainId),
    bridge: session.bridge,
    key: session.key,
    handshakeId: session.handshakeId.toString(),
    handshakeTopic: session.handshakeTopic,
    peerId: session.peerId,
    clientId: session.clientId,
    listening: connection.listening,
  }
}

export const mapConnectionToWalletConnectRefSession = (connection: Connection, config: OreIDWalletConnectConfig) => {
  const { clientDescription, clientIcons, clientName, clientUrl } = config
  const currentUrl = `${window.location.protocol}//${window.location.host}`
  const session = {
    bridge: connection.bridge,
    key: connection.key,
    peerId: connection.peerId,
    peerMeta: {
      description: connection.description || '',
      icons: connection.logoUrl ? [connection.logoUrl] : [],
      name: connection.name,
      url: connection.peerUrl,
    },
    handshakeId: Number(connection.handshakeId),
    handshakeTopic: connection.handshakeTopic,
    chainId: mapChainNetworkToChainId(connection.chainNetwork),
    connected: true,
    accounts: [config.account],
    clientId: connection.clientId,
    clientMeta: { description: clientDescription, icons: clientIcons, name: clientName, url: clientUrl || currentUrl },
  }
  return session
}

const mapChainIdToChainNetwork = (chainId: number): ChainNetwork => {
  if (chainId === 1) return ChainNetwork.EthMain
  if (chainId === 3) return ChainNetwork.EthRopsten
  if (chainId === 4) return ChainNetwork.EthRinkeby
  if (chainId === 40) return ChainNetwork.TelosMain
  if (chainId === 41) return ChainNetwork.TelosTest
  if (chainId === 59) return ChainNetwork.EosMain
  if (chainId === 95) return ChainNetwork.EosKylin
  throw Error(`Unsupported chainId: ${chainId}`)
}

export const mapChainNetworkToChainId = (chainNetwork: string): number => {
  if (chainNetwork === ChainNetwork.EthMain.toString()) return 1
  if (chainNetwork === ChainNetwork.EthRopsten.toString()) return 3
  if (chainNetwork === ChainNetwork.EthRinkeby.toString()) return 4
  if (chainNetwork === ChainNetwork.TelosMain.toString()) return 40
  if (chainNetwork === ChainNetwork.TelosTest.toString()) return 41
  if (chainNetwork === ChainNetwork.EosMain.toString()) return 59
  if (chainNetwork === ChainNetwork.EosKylin.toString()) return 95
  throw Error(`Unsupported chainNetwork: ${chainNetwork}`)
}
