import React from "react";
import ReactDOM from "react-dom";
import { WebWidget } from "oreid-js";

declare const window: any;
let OreIdWebWidgetChromeless: any;

if (window) {
  const widget = WebWidget.createWebWidget();
  window["WrapperComponent"] = widget;
  OreIdWebWidgetChromeless = window.WrapperComponent.driver("react", {
    React,
    ReactDOM,
  });
}

export default OreIdWebWidgetChromeless;