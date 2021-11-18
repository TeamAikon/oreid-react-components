import React from "react";
import { storiesOf } from "@storybook/react";
import OreIdWebWidget from "../dist/index";
import OreIdWebWidgetChromeless from "../dist/OreIdWebWidgetChromeless/OreIdWebWidgetChromeless";

storiesOf("OreIdWebWidget", module).add("Default", () => (
  <div>
    <h1>OreIdWebWidget Component</h1>
    <OreIdWebWidget
      oreIdOptions={{
        appName: "Storybooks App",
        appId: process.env.REACT_APP_OREID_APP_ID,
        signCallbackUrl: process.env.REACT_APP_OREID_AUTH_CALLBACK_URL,
      }}
      options={{
        accessToken: "",
        chainNetwork: "",
        accountType: "native",
        account: "",
        provider: "google",
      }}
      action="newAccount"
      onSuccess={(result) => {
        console.log("onSuccess", result);
      }}
      onError={(result) => {
        console.log("onError", result);
        alert(JSON.stringify(result));
      }}
    />
  </div>
));

storiesOf("OreIdWebWidgetChromeless", module).add("Default", () => (
  <div>
    <h1>OreIdWebWidgetChromeless Component</h1>
    <OreIdWebWidgetChromeless
      oreIdOptions={{
        appName: "Storybooks App",
        appId: process.env.REACT_APP_OREID_APP_ID,
        signCallbackUrl: process.env.REACT_APP_OREID_AUTH_CALLBACK_URL,
      }}
      options={{
        accessToken: "",
        chainNetwork: "",
        accountType: "native",
        account: "",
        provider: "google",
      }}
      action="newAccount"
      onSuccess={(result) => {
        console.log("onSuccess", result);
      }}
      onError={(result) => {
        console.log("onError", result);
        alert(JSON.stringify(result));
      }}
    />
  </div>
));

/**
import React from "react";
import { storiesOf } from "@storybook/react";
import OreIdWebWidget from "../../dist/index";

storiesOf("OreIdWebWidget", module).add("Default", () => (
  <div>
    <h1>OreId WebWidget React Wrapper</h1>
    <OreIdWebWidget
      oreIdOptions={{
        appName: "Viktor's app",
        appId: process.env.REACT_APP_OREID_APP_ID,
        apiKey: process.env.REACT_APP_OREID_API_KEY,
        oreIdUrl: "http://localhost:8080",
        signCallbackUrl: this.authCallbackUrl,
      }}
      action="sign"
      options={{
        provider: "oreid", // wallet type (e.g. 'algosigner' or 'oreid')
        account: accountName || "",
        broadcast: true, // if broadcast=true, ore id will broadcast the transaction to the chain network for you
        chainAccount: chainAccount,
        chainNetwork: "eos_kylin",
        state: "test", // anything you'd like to remember after the callback
        transaction: {
          actions: [
            {
              account: "demoapphello",
              name: "hi",
              authorization: [
                {
                  actor: "demoapphello",
                  permission: "active",
                },
              ],
              data: {
                user: chainAccount,
              },
            },
          ],
        },
        returnSignedTransaction: false,
        preventAutoSign: false, // prevent auto sign even if transaction is auto signable
      }}
      onSuccess={(result) => {
        const params = JSON.parse(
          '{"' +
            decodeURI(result?.split("?")[1])
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
        console.log(params);
        this.setState({ oreIdResult: params });
        this.onCloseModal();
      }}
      onError={(result) => {
        this.onCloseModal();
      }}
    />
  </div>
));
*/
