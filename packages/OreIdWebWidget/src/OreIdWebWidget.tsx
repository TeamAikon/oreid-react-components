import React, { Component, CSSProperties, useCallback, useEffect, useState } from "react";
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

const hasWindow = typeof window !== "undefined"

// We don't define props here - they ahould be passed down from script from service endpoint
type WebWidgetProps = { [key: string]: any };

export type OreIdReactWebWidgetProps = {
  onClose?: MouseEventHandler;
  show?: boolean;
  disableBackdropClick?: boolean;
  widgetUrl?: string; // optional override of endpoint to download widget javascript (for dev purposes only)
} & WebWidgetProps; // all other properties from WebWidgetProps type

const widgetVersion = '1'
const oreIdServiceBaseUrl = "https://service.oreid.io";
const defaultWidgetUrl = `${oreIdServiceBaseUrl}/download/oreid-webwidget-v${widgetVersion}.js`;

let WebWidgetWithReactDriver: any;
let scriptStatus: ScriptStatus = ScriptStatus.Idle
let errorMessage: string

export default function OreIdWebWidget(props: OreIdReactWebWidgetProps) {
  const loadFromUrl: string = props?.widgetUrl || defaultWidgetUrl;
  const [widgetLoaded, setWidgetLoaded] = useState<boolean>(false);
  scriptStatus = useExternalScript(loadFromUrl);

  // catch any webwidget script errors
  useEffect(() => {
    if (hasWindow)
      window.onerror = (message, source, lineno, colno, error) => {
        if (props?.onError) props.onError({ errors: message || error });
        console.error(message, source, lineno, colno, error);
        if (!error) return;
        if (message === "Script error.") {
          scriptStatus = ScriptStatus.ErrorExecution;
        }
      };
  }, []);
  
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
    if (!hasWindow) return;
    const myWindow = window as Window;
    if (scriptStatus === ScriptStatus.Ready && !myWindow.WrapperComponent) {
      initWidget();
    }
  }, [scriptStatus]);

  /** runs after webwidget script is loaded */
  const initWidget = useCallback(() => {
    const myWindow = window as Window;
    if (!myWindow?.webwidget) return;
    // create widget instance using downloaded webwidget script (which is attached to window)
    const widget = myWindow?.webwidget?.createWebWidget();
    myWindow.WrapperComponent = widget;
    WebWidgetWithReactDriver = myWindow.WrapperComponent.driver("react", {
      React,
      ReactDOM,
    });
    setWidgetLoaded(true);
  }, [typeof window, scriptStatus]);

  return <div>{widgetLoaded && <WebWidgetWrapper {...props} />}</div>;
}

/** Wrapper around WebWidget that handles 'show', 'disableBackdropClick', and background styles */
export class WebWidgetWrapper extends Component<OreIdReactWebWidgetProps> {
  componentDidCatch(error: any, errorInfo: any) {
    console.error(error);
    console.trace(errorInfo);
    this.props.onError && this.props.onError(error);
  }

  render() {
    const { disableBackdropClick = false, show = false, onClose, ...webWidgetProps } = this.props;
    if (!show) return null;
    return (
      <div style={modalBackgroundStyle} onClick={!disableBackdropClick ? onClose : undefined}>
        <div
          style={{
            ...modalContainerStyle,
            backgroundColor: webWidgetProps?.oreIdOptions?.backgroundColor || "#f3f3f3",
          }}
        >
          <WebWidgetWithReactDriver {...webWidgetProps} />
        </div>
      </div>
    );
  }
}
