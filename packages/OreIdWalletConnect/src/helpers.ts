// public helper functions
import { mapChainNetworkToChainId } from './mapper'

export const hasChainSupport = (chainNetwork: string): boolean => {
  try {
    return !!mapChainNetworkToChainId(chainNetwork)
  } catch (e) {
    return false
  }
}
