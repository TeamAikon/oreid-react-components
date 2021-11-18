import React from 'react'
import { OutlineButton } from './OutlineButton'

export default {
  title: 'OutlineButton',
  component: OutlineButton,
}

/* Rectangle */

const Template = (props: any) => {
  return <OutlineButton {...props}>Start Session</OutlineButton>
}

export const Defaul = Template.bind({})
Defaul.args = {
  onClick: () => console.log('Click'),
}
