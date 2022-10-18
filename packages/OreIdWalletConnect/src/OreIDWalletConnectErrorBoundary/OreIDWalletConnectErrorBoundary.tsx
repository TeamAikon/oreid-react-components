import React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { OreIDWalletConnect } from '../OreIDWalletConnect'
import { OreIDWalletConnectProps } from '../types'

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

  // static getDerivedStateFromError(error: any) {
  static getDerivedStateFromError() {
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
    return <ContainerDimensions>{({ width }) => <OreIDWalletConnect width={width} {...props} />}</ContainerDimensions>
  }
}
