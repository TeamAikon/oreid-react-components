import React from 'react';
import ReactDOM from 'react-dom';
import { WebWidget } from 'oreid-js';

declare const window: any;

WebWidget.defineWebWidget('WrapperComponent');
const OreIdWebWidget = window.WrapperComponent.driver('react', {
  React,
  ReactDOM,
});

export default OreIdWebWidget;