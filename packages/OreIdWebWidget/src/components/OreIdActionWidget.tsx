import React, { CSSProperties, FunctionComponent, useState, useEffect, useRef, memo } from "react";
import ReactDOM from "react-dom";
import { WebWidget } from "oreid-js";

const iFrameBackgroundStyle: CSSProperties = {
  position: "fixed",
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.3)",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  justifyContent: "center",
};

const iFrameContainerStyle = (backgroundColor: CSSProperties['backgroundColor'] = '#fafafa'): CSSProperties => ({
  backgroundColor,
  borderRadius: "8px",
  maxHeight: "650px",
  maxWidth: "700px",
  boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
  position: "relative",
  alignSelf: "center",
  overflow: "hidden",
});

export interface OreIdActionWidgetProps extends WebWidget.WebWidgetProps {
  onDestroy: () => void;
}

let OreIdReactActionComponent: any

const OreIdActionWidget: FunctionComponent<OreIdActionWidgetProps> = (props) => {
  const {
    oreIdOptions,
    action = {},
    onSuccess,
    onError,
  } = props;

  const [actionComponentKey, setActionComponentKey] = useState<string>('')
  const actionComponentRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && !OreIdReactActionComponent) {
      OreIdReactActionComponent = true
      window.OreIdActionWidget = WebWidget.createActionWidget();
      OreIdReactActionComponent = window.OreIdActionWidget.driver("react", { React, ReactDOM })
      setActionComponentKey('OreIdReactActionComponent')
    }
    // clean-up
    return () => {
      OreIdReactActionComponent = null
      actionComponentRef.current?.state?.parent?.close()
      props.onDestroy()
    }
  }, [])

  return (
    <div key={actionComponentKey} style={iFrameBackgroundStyle}>
      <div style={iFrameContainerStyle(oreIdOptions?.backgroundColor || "#f3f3f3")}>
        {OreIdReactActionComponent && (
          <OreIdReactActionComponent ref={actionComponentRef} oreIdOptions={oreIdOptions} action={action} onSuccess={onSuccess} onError={onError} />
        )}
      </div>
    </div>
  );
};

export default memo(OreIdActionWidget);
