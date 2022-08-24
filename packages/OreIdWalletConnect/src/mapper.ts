import WalletConnectClient from '@walletconnect/client'
import { ChainNetwork, ChainNetworkMap, Connection, WalletConnectRef, OreIDWalletConnectConfig } from './types'

export const chainNetworkMap: ChainNetworkMap[] = [
  {
    chainNetwork: ChainNetwork.EthMain,
    id: 1,
    name: 'Ethereum',
  },
  {
    chainNetwork: ChainNetwork.EthRopsten,
    id: 3,
    name: 'Ethereum Ropsten',
  },
  {
    chainNetwork: ChainNetwork.EthRinkeby,
    id: 4,
    name: 'Ethereum Rinkeby',
  },
  {
    chainNetwork: ChainNetwork.EthGoerli,
    id: 5,
    name: 'Ethereum Goerli',
  },
]

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

export const mapChainIdToChainNetwork = (chainId: number): ChainNetwork => {
  const chainNetwork = chainNetworkMap.find(cnm => cnm.id === chainId)?.chainNetwork
  if (!chainNetwork) throw Error(`Chain Id ${chainId} not supported`)
  return chainNetwork
}

export const mapChainNetworkToChainId = (chainNetwork: string): number => {
  const chainId = chainNetworkMap.find(cnm => cnm.chainNetwork === chainNetwork)?.id
  if (!chainId) throw Error(`Chain network ${chainNetwork} not supported`)
  return chainId
}

export const mapChainNetworkToName = (chainNetwork: string): string => {
  const chainName = chainNetworkMap.find(cnm => cnm.chainNetwork === chainNetwork)?.name
  if (!chainName) throw Error(`Chain network ${chainNetwork} not supported`)
  return chainName
}
