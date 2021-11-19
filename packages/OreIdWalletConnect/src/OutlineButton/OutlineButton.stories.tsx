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

export const Default = Template.bind({})
Default.args = {
  onClick: () => console.log('Click'),
}
