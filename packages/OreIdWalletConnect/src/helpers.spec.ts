import { hasChainSupport } from './helpers'
import { ChainNetwork } from './types'

it('Check if has support', () => {
  expect(hasChainSupport(ChainNetwork.EthMain)).toBe(true)
  expect(hasChainSupport(ChainNetwork.EthRinkeby)).toBe(true)
  expect(hasChainSupport(ChainNetwork.EthRopsten)).toBe(true)
})

it('Check if has no support', () => {
  expect(hasChainSupport(ChainNetwork.OreMain)).toBe(false)
  expect(hasChainSupport(ChainNetwork.OreTest)).toBe(false)
})
