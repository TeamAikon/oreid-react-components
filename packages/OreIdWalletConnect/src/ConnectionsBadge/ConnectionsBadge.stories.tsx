import React from 'react'
import { PeerMeta } from '../types'
import { ConnectionsBadge } from './ConnectionsBadge'

export default {
  title: 'ConnectionsBadge',
  component: ConnectionsBadge,
}

const peerMeta: PeerMeta[] = ([
  {
    icons: ['https://app.uniswap.org/./favicon.png'],
  },
  {
    icons: ['https://example.walletconnect.org/favicon.ico'],
  },
  {
    icons: ['https://app.uniswap.org/./favicon.png'],
  },
  {
    icons: ['https://example.walletconnect.org/favicon.ico'],
  },
] as unknown) as PeerMeta[]

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ConnectionsBadge {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  peerMeta,
  onClick: () => console.log('Click'),
}
