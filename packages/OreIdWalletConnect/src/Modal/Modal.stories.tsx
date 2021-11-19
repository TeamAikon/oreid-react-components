import { MuiThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import theme from '../assets/_styles/theme'
import { Loading } from '../Loading'
import { Modal } from './Modal'

export default {
  title: 'Modal',
  component: Modal,
}

const ModalExample = (props: any) => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <MuiThemeProvider theme={theme}>
        <Modal open={open} onClose={() => setOpen(false)} {...props}>
          MODAL CONTENT EXAMPLE
          <Loading />
          MODAL CONTENT EXAMPLE
        </Modal>
      </MuiThemeProvider>
    </>
  )
}

const Template = (props: any) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #151F44 0%, #270D76 100%)',
        padding: '50px',
      }}
    >
      <ModalExample {...props} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  header: false,
}
