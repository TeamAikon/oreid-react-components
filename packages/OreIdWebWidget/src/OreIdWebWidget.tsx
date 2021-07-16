import React from 'react';
import ReactDOM from 'react-dom';
import { WebWidget } from 'oreid-js';

declare const window: any;
let OreIdWebWidget: any;

if (window) {
  const widget = WebWidget.createWebWidget();
  window['WrapperComponent'] = widget;
  OreIdWebWidget = window.WrapperComponent.driver('react', {
    React,
    ReactDOM,
  });
}

export default OreIdWebWidget;