import React, { Component } from 'react'
import Roboto from './assets/Roboto-Medium.ttf'
import providers, { providerList } from './providers'

let defaultButtonStyle = {
  padding: '10px 10px 10px 10px',
  backgroundColor: '#3E5895',
  color: '#ffffff',
  fontFamily: Roboto + 'sans-serif',
  fontWeight: '500',
  fontSize: '14px',
  width: 200,
  lineHeight: '22px',
  letterSpacing: '1px',
  textAlign: 'left',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
}

const defaultLogoStyle = {
  width: '18px',
  marginLeft: '10px',
  marginRight: '10px',
  verticalAlign: 'text-bottom'
}

type Provider = string

type ClickCallback<T = Element> = (event: React.MouseEvent<T, MouseEvent>, provider: Provider) => void

interface Props {
  onClick: ClickCallback
  provider: Provider
  text: string
  buttonStyle: any
  logoStyle: any
}

interface State {
  provider: Provider
  onClickCallback: ClickCallback
  buttonStyle: any
  logoStyle: any
  text: string
}

class LoginButton extends Component<Props, State> {
  props:Props
  constructor(props: Props) {
    super(props)
    const providerMetadata = this.getProviderMetadata(props.provider)
    let providerStyle = providerMetadata.style || {} // get the style for this provider
    this.state = {
      provider: props.provider,
      onClickCallback: props.onClick,
      buttonStyle: { ...defaultButtonStyle, ...providerMetadata.style.buttonStyle || {} ,...props.buttonStyle || {} },
      logoStyle: { ...defaultLogoStyle, ...providerMetadata.style.logoStyle || {}, ...props.logoStyle || {} },
      text: (props.text || providerMetadata.style.text)
    }
    this.props = props
  }

  getProviderMetadata(provider: Provider) {
    const providerMetadata = providers.find(p=> p.id === provider)
    if(!providerMetadata) {
      throw Error(`${provider} is not one of the supported providers. Use one of the following: ${providerList}`)
    }
    return providerMetadata
  }

  render() {
    const providerMetadata = this.getProviderMetadata(this.props.provider)
    let { provider, onClickCallback, buttonStyle, logoStyle, text } = this.state
    return (
      <div>
        <button style={buttonStyle} onClick={(e) => {onClickCallback(e, provider);}}>
          <img style={logoStyle} src={providerMetadata.logo} alt={text}/>
          {text}
        </button>
      </div>
    )
  }
}

export default LoginButton;
