import React, { CSSProperties, FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import { WebWidget } from "oreid-js";
import { MouseEventHandler } from "react";
import { useState } from "react";

const modalBackgroundStyle: CSSProperties = {
  position: "fixed",
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.3)",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  justifyContent: "center",
};

const modalContainerStyle: CSSProperties = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  maxHeight: "650px",
  maxWidth: "700px",
  boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
  position: "relative",
  alignSelf: "center",
  overflow: "hidden",
};

let OreIdReactActionComponent: any;

export interface OreIdActionWidgetProps extends WebWidget.ActionWidgetProps {
  onClose?: MouseEventHandler;
  show?: boolean;
  disableBackdropClick?: boolean;
}

const OreIdActionWidget: FunctionComponent<OreIdActionWidgetProps> = (props) => {
  const {
    oreIdOptions = { backgroundColor: "#f3f3f3" },
    action = {},
    disableBackdropClick = false,
    show = false,
    onSuccess,
    onError,
    onClose,
  } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.OreIdActionComponent = WebWidget.createActionWidget();
      OreIdReactActionComponent = window.OreIdActionComponent.driver("react", {
        React,
        ReactDOM,
      });
    }
  }, []);

  return (
    <>
      {show && (
        <div style={modalBackgroundStyle} onClick={!disableBackdropClick ? onClose : undefined}>
          <div style={{ ...modalContainerStyle, backgroundColor: oreIdOptions.backgroundColor || "#f3f3f3" }}>
            {OreIdReactActionComponent && (
              <OreIdReactActionComponent oreIdOptions={oreIdOptions} action={action} onSuccess={onSuccess} onError={onError} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OreIdActionWidget;
