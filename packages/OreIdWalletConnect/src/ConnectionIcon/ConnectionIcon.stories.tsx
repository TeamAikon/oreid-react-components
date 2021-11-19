import React from 'react'
import { ConnectionIcon } from './ConnectionIcon'

export default {
  title: 'ConnectionIcon',
  component: ConnectionIcon,
  argTypes: {
    size: {
      control: { type: 'number', min: 1 },
    },
  },
}

/* Rectangle */

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ConnectionIcon {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  icon: 'https://app.uniswap.org/./favicon.png',
  size: 20,
}
