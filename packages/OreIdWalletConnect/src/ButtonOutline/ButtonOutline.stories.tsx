import React from 'react'
import { ButtonOutline } from './ButtonOutline'

export default {
  title: 'ButtonOutline',
  component: ButtonOutline,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ButtonOutline {...props} />
    </div>
  )
}

export const Defaul = Template.bind({})
Defaul.args = {
  label: 'Connect',
  onClick: () => console.log('Click'),
}
