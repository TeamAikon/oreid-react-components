import React from "react";
import { storiesOf } from "@storybook/react";
import LoginButton from "../dist/index";

storiesOf("LoginButton", module).add("Default", () => (
  <div>
    <h1>hello</h1>
    <LoginButton
      provider={"oreid"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"algosigner"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"apple"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"email"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"facebook"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"github"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"google"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"kakao"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"line"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"linkedin"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"phone"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"twitch"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"twitter"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"wechat"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"keycat"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"ledger"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"lynx"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"meetone"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"portis"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"scatter"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"simpleos"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"tokenpocket"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"walletconnect"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"web3"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
    <LoginButton
      provider={"whalevault"}
      onClick={() => {
        alert("Clicked");
      }}
    ></LoginButton>
  </div>
));
