import React from 'react'
import { Loading } from './Loading'

export default {
  title: 'Loading',
  component: Loading,
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <Loading {...props} />
    </div>
  )
}

export const Defaul = Template.bind({})
