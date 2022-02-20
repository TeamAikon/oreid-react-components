import React, { Component, ErrorInfo } from "react";
import OreIdActionWidget, { OreIdActionWidgetProps } from "./OreIdActionWidget";
import OreIdAuthWidget, { OreIdAuthWidgetProps } from "./OreIdAuthWidget";

export default class OreIdWebWidget extends Component<OreIdActionWidgetProps | OreIdAuthWidgetProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.trace(error);
    console.error(errorInfo);
  }

  render() {
    // Essential props for OreIdWebWidget
    const oreIdActionWidgetProps = this.props as OreIdActionWidgetProps;
    const oreIdAuthWidgetProps = this.props as OreIdAuthWidgetProps;
    return (
      <>
        {oreIdActionWidgetProps.action ? (
          <OreIdActionWidget {...oreIdActionWidgetProps} />
        ) : (
          <>{oreIdAuthWidgetProps.authUrl && <OreIdAuthWidget {...oreIdAuthWidgetProps} />}</>
        )}
      </>
    );
  }
}
