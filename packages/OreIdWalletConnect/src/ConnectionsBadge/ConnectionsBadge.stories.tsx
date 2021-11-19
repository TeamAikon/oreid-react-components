import React from 'react'
import { Connection } from '../types'
import { ConnectionsBadge } from './ConnectionsBadge'

export default {
  title: 'ConnectionsBadge',
  component: ConnectionsBadge,
}

const Connections: Connection[] = [
  {
    peerMeta: {
      icons: [
        'https://app.uniswap.org/./favicon.png',
        'https://app.uniswap.org/./images/192x192_App_Icon.png',
        'https://app.uniswap.org/./images/512x512_App_Icon.png',
      ],
      // ...
    },
    // ...
  },
  {
    peerMeta: {
      icons: ['https://example.walletconnect.org/favicon.ico'],
      // ...
    },
    // ...
  },
] as Connection[]

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
  Connections,
  onClick: () => console.log('Click'),
}
