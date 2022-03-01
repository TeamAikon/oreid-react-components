import { WebWidgetAction } from "oreid-js/dist/webwidget";
import React, { Component, ErrorInfo } from "react";
import OreIdActionWidget from "./OreIdActionWidget";
import OreIdAuthWidget from "./OreIdAuthWidget";
import { WebWidget } from "oreid-js";

export interface OreIdWebWidgetProps extends WebWidget.WebWidgetProps {
  show?: boolean
}

export default class OreIdWebWidget extends Component<OreIdWebWidgetProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.trace(error);
    console.error(errorInfo);
  }

  componentWillUnmount(){
    WebWidget.destroyWidgets()
  }

  render() {
    // Essential props for OreIdWebWidget
    const { show, ...props } = this.props
    const dappAction = props.action?.name
    if (!show || !dappAction) return null
    const isDappActionAuth = dappAction === WebWidgetAction.Auth
    return (
      <>
        {isDappActionAuth && <OreIdAuthWidget onDestroy={this.componentWillUnmount} {...props} />}
        {!isDappActionAuth && <OreIdActionWidget onDestroy={this.componentWillUnmount} {...props} />}
      </>
    );
  }
}
