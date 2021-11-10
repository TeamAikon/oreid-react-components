import React from 'react'
import { OnSignal } from './OnSignal'

export default {
  title: 'OnSignal',
  component: OnSignal,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <OnSignal {...props} />
    </div>
  )
}

export const Defaul = Template.bind({})
