import React, { Component } from 'react'
import Roboto from './fonts/Roboto-Medium.ttf'
import providers from './providers'

let defaultButtonStyle = {
  padding: '10px 24px 10px 14px',
  backgroundColor: '#3E5895',
  color: '#ffffff',
  fontFamily: Roboto + 'sans-serif',
  fontWeight: '500',
  fontSize: '14px',
  width: 250,
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

class LoginButton extends Component {
  constructor(props) {
    super(props)
    const providerMetadata = this.getProviderMetadata(this.props.provider)
    let providerStyle = providerMetadata.style || {} // get the style for this provider
    this.state = {
      provider: this.props.provider,
      onClickCallback: this.props.onClick,
      buttonStyle: { ...defaultButtonStyle, ...providerMetadata.style.buttonStyle || {} ,...this.props.buttonStyle || {} },
      logoStyle: { ...defaultLogoStyle, ...providerMetadata.style.logoStyle || {}, ...this.props.logoStyle || {} },
      text: (this.props.text || providerMetadata.style.text)
    }
  }

  getProviderMetadata(provider) {
    const providerMetadata = providers.find(p=> p.id === provider)
    if(!providerMetadata) {
      throw Error(`${provider} is not one of the supported providers. Use one of the following: ${validProviders.join(', ')}`)
    }
    return providerMetadata
  }

  render() {
    const providerMetadata = this.getProviderMetadata(this.props.provider)
    let { provider, onClickCallback, buttonStyle, logoStyle, text } = this.state
    return (
      <div>
        <button style={buttonStyle} onClick={() => {onClickCallback(provider);}}>
          <img style={logoStyle} src={providerMetadata.logo} alt={text}/>
          {text}
        </button>
      </div>
    )
  }
}

export default LoginButton;
