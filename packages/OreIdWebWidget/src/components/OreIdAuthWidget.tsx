import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { WebWidget } from "oreid-js";

export interface OreIdAuthWidgetProps extends WebWidget.AuthWidgetProps {}

let OreIdReactAuthComponent: any;

const OreIdAuthWidget: FunctionComponent<OreIdAuthWidgetProps> = (props) => {
  const { authUrl } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OreIdAuthComponent = WebWidget.createAuthWidget();
      OreIdReactAuthComponent = window.OreIdAuthComponent.driver("react", {
        React,
        ReactDOM,
      });
    }
  }, []);

  return <>{OreIdReactAuthComponent && <OreIdReactAuthComponent authUrl={authUrl} />}</>;
};

export default OreIdAuthWidget;
