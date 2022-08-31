// public helper functions
import { mapChainNetworkToChainId } from './mapper'
import { OreIDWalletConnectSize } from './types'

export const hasChainSupport = (chainNetwork: string): boolean => {
  try {
    return !!mapChainNetworkToChainId(chainNetwork)
  } catch (e) {
    return false
  }
}

export const getSize = (width: number) => {
  if (width >= OreIDWalletConnectSize.Wide) {
    return OreIDWalletConnectSize.Wide
  }
  if (width >= OreIDWalletConnectSize.Medium) {
    return OreIDWalletConnectSize.Medium
  }
  return OreIDWalletConnectSize.Small
}
