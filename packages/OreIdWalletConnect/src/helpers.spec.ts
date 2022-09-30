import { hasChainSupport } from './helpers'
import { ChainNetwork } from './types'

it('Check if has support', () => {
  expect(hasChainSupport(ChainNetwork.EthMain)).toBe(true)
  expect(hasChainSupport(ChainNetwork.EthRinkeby)).toBe(true)
  expect(hasChainSupport(ChainNetwork.EthRopsten)).toBe(true)
  expect(hasChainSupport(ChainNetwork.EthGoerli)).toBe(true)
  expect(hasChainSupport(ChainNetwork.TelosEvmMain)).toBe(true)
  expect(hasChainSupport(ChainNetwork.TelosEvmTest)).toBe(true)
  expect(hasChainSupport(ChainNetwork.AvalancheC_Main)).toBe(true)
  expect(hasChainSupport(ChainNetwork.AvalancheC_Fuji)).toBe(true)
})

it('Check if has no support', () => {
  expect(hasChainSupport(ChainNetwork.OreMain)).toBe(false)
  expect(hasChainSupport(ChainNetwork.OreTest)).toBe(false)
})
