import React from "react";
import ReactDOM from "react-dom";
import { createWebWidget } from "oreid-js/dist/webwidget";

declare const window: any;
let OreIdWebWidgetChromeless: any;

if (window) {
  window["WrapperComponent"] = createWebWidget();
  OreIdWebWidgetChromeless = window.WrapperComponent.driver("react", {
    React,
    ReactDOM,
  });
}

export default OreIdWebWidgetChromeless;