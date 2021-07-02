import React from 'react'
import { storiesOf } from '@storybook/react'
import OreIdWebWidget from 'oreid-web-widget'

storiesOf("OreIdWebWidget", module).add("Default", () => (
  <div>
    <h1>OreId WebWidget React Wrapper</h1>
    <OreIdWebWidget
      oreIdOptions={{
        appName: "Viktor's app",
        appId: process.env.REACT_APP_OREID_APP_ID,
        apiKey: process.env.REACT_APP_OREID_API_KEY,
        oreIdUrl: 'http://localhost:8080',
        signCallbackUrl: this.authCallbackUrl,
      }}
      action="sign"
      options={{
          provider: 'oreid', // wallet type (e.g. 'algosigner' or 'oreid')
          account: accountName || '',
          broadcast: true, // if broadcast=true, ore id will broadcast the transaction to the chain network for you
          chainAccount: chainAccount,
          chainNetwork: 'eos_kylin',
          state: 'test', // anything you'd like to remember after the callback
          transaction: {
            actions: [
              {
                account: 'demoapphello',
                name: 'hi',
                authorization: [
                  {
                    actor: 'demoapphello',
                    permission: 'active'
                  },
                ],
                data: {
                  user: chainAccount
                }
              }
            ]
          },
          returnSignedTransaction: false,
          preventAutoSign: false, // prevent auto sign even if transaction is auto signable
      }}
      onSuccess={(result) => {
        const params = JSON.parse('{"' + decodeURI(result.split('?')[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        console.log(params)
        this.setState({ oreIdResult: params })
        this.onCloseModal()
      }}
      onError={(result) => {
        this.onCloseModal()
      }}
    />
  </div>
))
