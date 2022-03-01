import React, { FunctionComponent, useState, useEffect, useRef, memo } from "react";
import ReactDOM from "react-dom";
import { WebWidget } from "oreid-js";

export interface OreIdAuthWidgetProps extends WebWidget.WebWidgetProps {
  onDestroy: () => void
}

let OreIdReactAuthComponent: any

const OreIdAuthWidget: FunctionComponent<OreIdAuthWidgetProps> = (props) => {
  const [authKey, setAuthKey] = useState<string>('')
  const authComponentRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && !OreIdReactAuthComponent) {
      window.OreIdAuthWidget = WebWidget.createAuthWidget();
      OreIdReactAuthComponent = window.OreIdAuthWidget.driver("react", { React, ReactDOM })
      setAuthKey('OreIdReactAuthComponent')
    }
    // clean-up
    return () => {
      OreIdReactAuthComponent = null
      // authComponentRef.current?.state?.parent?.close()
      props.onDestroy()
    }
  }, [])

  return (
    <div key={authKey}>
      {OreIdReactAuthComponent && <OreIdReactAuthComponent ref={authComponentRef} {...props} />}
    </div>
  );
};

export default memo(OreIdAuthWidget);
