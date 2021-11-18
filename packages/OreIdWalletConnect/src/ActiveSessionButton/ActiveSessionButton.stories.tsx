import React from 'react'
import { ActiveSessionButton } from './ActiveSessionButton'

export default {
  title: 'ActiveSessionButton',
  component: ActiveSessionButton,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ActiveSessionButton {...props} />
    </div>
  )
}

export const Defaul = Template.bind({})
Defaul.args = {
  onClick: () => console.log('Click'),
}
