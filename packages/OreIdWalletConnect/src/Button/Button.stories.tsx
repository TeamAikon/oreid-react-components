import React from 'react'
import { Button } from './Button'

export default {
  title: 'Button',
  component: Button,
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
      <Button {...props}>Enabled</Button>
      <br />
      <br />
      <br />
      <Button {...props} disabled>
        Disabled
      </Button>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  onClick: () => console.log('Click'),
}
