import WalletConnectClient from '@walletconnect/client'
import { ChainNetwork, Connection, WalletConnectRef, WalletConnectClientSession } from './types'

export const mapWalletConnectRefToConnection = (conection: WalletConnectRef): Connection => {
  const { chainId, ...session } = conection.connector.session
  return {
    uri: conection.connector.uri,
    listening: conection.listening,
    walletConnectClientSession: mapSessionToWalletConnectClientSession(conection.connector),
  }
}

const mapSessionToWalletConnectClientSession = (
  walletConnectClient: WalletConnectClient,
): WalletConnectClientSession => {
  const { chainId, ...session } = walletConnectClient.session
  return {
    ...(session as any),
    chainNetwork: mapChainIdToChainNetwork(chainId),
  }
}

export const mapWalletConnectClientSessionToSession = (walletConnectClientSession: WalletConnectClientSession): any => {
  const { chainNetwork, ...session } = walletConnectClientSession
  return {
    ...session,
    chainId: mapChainNetworkToChainId(chainNetwork),
  }
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

export const mapChainNetworkToChainId = (chainNetwork: ChainNetwork): number => {
  if (chainNetwork === ChainNetwork.EthMain) return 1
  if (chainNetwork === ChainNetwork.EthRopsten) return 3
  if (chainNetwork === ChainNetwork.EthRinkeby) return 4
  if (chainNetwork === ChainNetwork.TelosMain) return 40
  if (chainNetwork === ChainNetwork.TelosTest) return 41
  if (chainNetwork === ChainNetwork.EosMain) return 59
  if (chainNetwork === ChainNetwork.EosKylin) return 95
  throw Error(`Unsupported chainNetwork: ${chainNetwork}`)
}
