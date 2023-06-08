// public helper functions
import { mapChainNetworkToChainId } from './mapper'
import {
  ActionEthSendTransactionRequest,
  ActionEthSignRequest,
  ActionEthSignTransactionRequest,
  ActionPersonalSignRequest,
  ActionSignTypedDataRequest,
  OreIDWalletConnectSize,
  WalletConnectAction,
  WalletConnectActionRequest,
} from './types'

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

export const getAddressFromRequest = (request: WalletConnectActionRequest) => {
  switch (request.method) {
    case WalletConnectAction.EthSignTransaction:
      return (request as ActionEthSignTransactionRequest).params[0].from
    case WalletConnectAction.EthSendTransaction:
      return (request as ActionEthSendTransactionRequest).params[0].from
    case WalletConnectAction.PersonalSign:
      return (request as ActionPersonalSignRequest).params[1]
    case WalletConnectAction.EthSign:
      return (request as ActionEthSignRequest).params[0]
    case WalletConnectAction.EthSignTypedData:
      return (request as ActionSignTypedDataRequest).params[0]
    default:
      return ''
  }
}

/** returns the message (string) to be signed for any of the supported sign Message actions
 * For SignTypedData, the message is a JSON stringified object
 * Retuns undefined if the request is not a sign message request (e.g. EthSignTransaction)
 */
export const getMessageToSignFromRequest = (request: WalletConnectActionRequest) => {
  switch (request.method) {
    case WalletConnectAction.PersonalSign:
      return (request as ActionPersonalSignRequest).params[0]
    case WalletConnectAction.EthSign:
      return (request as ActionEthSignRequest).params[1]
    case WalletConnectAction.EthSignTypedData:
      return JSON.stringify((request as ActionSignTypedDataRequest).params[1])
    default:
      return undefined
  }
}
