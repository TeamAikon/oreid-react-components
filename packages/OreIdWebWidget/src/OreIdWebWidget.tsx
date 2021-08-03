import React, { CSSProperties } from 'react';
import { WebWidget } from 'oreid-js';
import Roboto from './assets/Roboto-Medium.ttf'
import OreIdWebWidgetChromeless from './OreIdWebWidgetChromeless/OreIdWebWidgetChromeless';

const modalBackgroundStyle: CSSProperties = {
  position: 'fixed',
  backgroundColor: 'rgba(0,0,0,0.3)',
  height: '100vh',
  width: '100vw',
  top: 0,
  left: 0
}

const modalContainerStyle: CSSProperties = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  maxHeight: '650px',
  maxWidth: '700px',
  boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
  position: 'relative',
  top: '15%',
  left: '35%'
}

const closeButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '5%',
  right: '5%',
  zIndex: 1,
  cursor: 'pointer'
}

const closeButtonIconStyle: CSSProperties = {
  height: '30px',
  width: '30px',
  color: 'lightgray',
}

const openButtonIconStyle: CSSProperties = {
  padding: '10px 10px 10px 10px',
  backgroundColor: '#3E5895',
  color: '#ffffff',
  fontFamily: Roboto + 'sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  width: 200,
  lineHeight: '22px',
  letterSpacing: '1px',
  textAlign: 'center',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  cursor: 'pointer'
}
interface OreIdReactWebWidgetProps extends WebWidget.WebWidgetProps {
  onClose?: Function;
  onOpen?: Function;
  disableBackdropClick?: boolean
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={closeButtonIconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
)

export default class OreIdWebWidget extends React.Component<OreIdReactWebWidgetProps> {
  state = {
    showModal: false
  }

  constructor(props: OreIdReactWebWidgetProps) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onWebWidgetError = this.onWebWidgetError.bind(this);
    this.onWebWidgetSuccess = this.onWebWidgetSuccess.bind(this);
  }

  closeModal() {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    this.setState({ showModal: false })
  }

  onWebWidgetError(result: any) {
    this.props.onError(result)
    this.closeModal()
  }

  onWebWidgetSuccess(result: any) {
    this.props.onSuccess(result)
    this.closeModal()
  }

  openModal() {
    if (typeof this.props.onOpen === 'function') {
      this.props.onOpen();
    }
    this.setState({ showModal: true })
  }

  render() {
    const { showModal } = this.state;
    const {
      oreIdOptions,
      action,
      options,
      disableBackdropClick = false
    } = this.props;
    return (
      <div>
        <button style={openButtonIconStyle} onClick={this.openModal}>Open</button>
        {showModal && (
          <div style={modalBackgroundStyle} onClick={!disableBackdropClick ? this.closeModal : undefined}>
            <div style={{...modalContainerStyle, backgroundColor: oreIdOptions.backgroundColor || '#fafafa'}}>
              <span onClick={this.closeModal} style={closeButtonStyle}><CloseIcon /></span>
              <OreIdWebWidgetChromeless
                oreIdOptions={oreIdOptions}
                action={action}
                options={options}
                onSuccess={this.onWebWidgetSuccess}
                onError={this.onWebWidgetError}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}