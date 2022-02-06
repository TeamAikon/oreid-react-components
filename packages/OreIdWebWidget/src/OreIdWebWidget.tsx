import React, { CSSProperties, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MouseEventHandler } from "react";
import { useExternalScript, ScriptStatus } from "./hooks/useExternalScript";

interface Window {
  [key: string]: any;
  WrapperComponent?: any;
  webwidget?: any;
}

const modalBackgroundStyle: CSSProperties = {
  position: "fixed",
  display: "flex",
  backgroundColor: "rgba(0,0,0,0.3)",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  justifyContent: "center",
  zIndex: 1,
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

// We don't define props here - they ahould be passed down from script from service endpoint
type WebWidgetProps = { [key: string]: any };

type OreIdReactWebWidgetProps = {
  onClose?: MouseEventHandler;
  show?: boolean;
  disableBackdropClick?: boolean;
  scriptUrl?: string;
} & WebWidgetProps; // all other properties from WebWidgetProps type

const oreIdServiceBaseUrl = "https://service.oreid.io";
const defaultScriptUrl = `${oreIdServiceBaseUrl}/.well-known/ore-id-web-widget.js`;

let WebWidgetWithReactDriver: any;
let scriptStatus: ScriptStatus = ScriptStatus.Idle
let errorMessage: string

// catch any webwidget script errors
if(window) window.onerror = function(message, source, lineno, colno, error) { 
  if(!error) return
  if(message === 'Script error.')  {
    scriptStatus = ScriptStatus.ErrorExecution 
  }
  console.log('Javascript error:', message, source, lineno, colno, error) 
};

export default function OreIdWebWidget(props: OreIdReactWebWidgetProps) {
  const loadFromUrl: string = props?.scriptUrl || defaultScriptUrl;
  const [widgetLoaded, setWidgetLoaded] = useState<boolean>(false);
  scriptStatus = useExternalScript(loadFromUrl);

  /**  init widget after script is downloaded, return errors */
  useEffect(() => {
    if (scriptStatus === ScriptStatus.ErrorDownloading) {
      errorMessage = `error downloading webwidget script from ${loadFromUrl}`
    }
    if (scriptStatus === ScriptStatus.ErrorExecution) {
      errorMessage = `error running webwidget script from ${loadFromUrl}`
    }
    // call error callback if any errors
    if(errorMessage) {
      console.log(errorMessage)
      props?.onError({errors: errorMessage})
      return
    }
    if (!window) return;
    const myWindow = window as Window;
    if (scriptStatus === ScriptStatus.Ready && !myWindow.WrapperComponent) {
      initWidget();
    }
  }, [scriptStatus]);

  /** runs after webwidget script is loaded */
  function initWidget() {
    const myWindow = window as Window;
    if(!myWindow?.webwidget) return
    // create widget instance using downloaded webwidget script (which is attached to window)
    const widget = myWindow?.webwidget?.createWebWidget();
    myWindow.WrapperComponent = widget;
    WebWidgetWithReactDriver = myWindow.WrapperComponent.driver("react", {
      React,
      ReactDOM,
    });
    setWidgetLoaded(true);
  }

  return <div>{widgetLoaded && <WebWidgetWrapper {...props} />}</div>;
}

/** Wrapper around WebWidget that handles 'show', 'disableBackdropClick', and background styles */
export function WebWidgetWrapper(props: OreIdReactWebWidgetProps) {
  const {
    disableBackdropClick = false,
    show = false,
    onClose,
    ...webWidgetProps
  } = props;
  return (
    <div>
      {show && (
        <div
          style={modalBackgroundStyle}
          onClick={!disableBackdropClick ? onClose : undefined}
        >
          <div
            style={{
              ...modalContainerStyle,
              backgroundColor:
                props?.oreIdOptions?.backgroundColor || "#f3f3f3",
            }}
          >
            <div>
              <WebWidgetWithReactDriver {...webWidgetProps} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
