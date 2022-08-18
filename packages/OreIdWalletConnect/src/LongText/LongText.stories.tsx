import React from 'react'
import { LongText } from './LongText'

export default {
  title: 'LongText',
  component: LongText,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        color: '#fff',
        padding: '50px',
      }}
    >
      <LongText {...props}>Copy</LongText>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  text: 'wc:9605531b-4a51-458a-999b-ee373cc9d2b6@1?bridge=https%3A%2F%2Ft.bridge.walletconnect.org&key=c2abc7e2a919b87056aa4f451f7ec57d87aa4160c80ed6ca97697395cb042797',
  className: 'my-custom-className',
  href: 'http://localhost:6007/?path=/story/copytoclipboard--default',
  truncateInMiddle: true,
  showCopy: true,
  onCopy: (...args: any) => console.log('onCopy: ', { args }),
  onClick: (...args: any) => console.log('onClick: ', { args }),
}
