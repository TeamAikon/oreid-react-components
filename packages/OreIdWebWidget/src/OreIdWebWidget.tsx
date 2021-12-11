import React, { CSSProperties } from 'react';
import { WebWidget } from 'oreid-js';
import Roboto from './assets/Roboto-Medium.ttf'
import OreIdWebWidgetChromeless from './OreIdWebWidgetChromeless/OreIdWebWidgetChromeless';
import { MouseEventHandler } from 'react';

const modalBackgroundStyle: CSSProperties = {
  position: 'fixed',
  display: 'flex',
  backgroundColor: 'rgba(0,0,0,0.3)',
  height: '100vh',
  width: '100vw',
  top: 0,
  left: 0,
  justifyContent: 'center',
}

const modalContainerStyle: CSSProperties = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  maxHeight: '650px',
  maxWidth: '700px',
  boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',
  position: 'relative',
  alignSelf: 'center',
  overflow: 'hidden'
}
interface OreIdReactWebWidgetProps extends WebWidget.WebWidgetProps {
  onClose?: MouseEventHandler;
  show?: boolean;
  disableBackdropClick?: boolean
}

export default class OreIdWebWidget extends React.Component<OreIdReactWebWidgetProps> {
  render() {
    const {
      oreIdOptions = { backgroundColor: '#f3f3f3'},
      action = {},
      disableBackdropClick = false,
      show = false,
      onSuccess,
      onError,
      onClose
    } = this.props;
    return (
      <div>
        {show && (
          <div style={modalBackgroundStyle} onClick={!disableBackdropClick ? onClose : undefined}>
            <div style={{...modalContainerStyle, backgroundColor: oreIdOptions.backgroundColor || '#f3f3f3'}}>
              <OreIdWebWidgetChromeless
                oreIdOptions={oreIdOptions}
                action={action}
                onSuccess={onSuccess}
                onError={onError}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}