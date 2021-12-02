import React from 'react'
import { OreIDWalletConnectProps } from '../types'
import { OreIDWalletConnect } from '../OreIDWalletConnect'

interface Props extends OreIDWalletConnectProps {
  onControllerError?: (error: any, errorInfo: any) => void
}
interface State {
  hasError: boolean
}

export class OreIDWalletConnectErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (this.props.onControllerError) {
      this.props.onControllerError(error, errorInfo)
    }
  }

  render() {
    const { onControllerError, ...props } = this.props
    if (this.state.hasError) {
      return null
    }
    return <OreIDWalletConnect {...props} />
  }
}
