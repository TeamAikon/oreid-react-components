# ORE ID React Library
Popup User Experience and React helpers for ORE ID

This library should be used in a React application. If you aren't using React, you should instead use the pure HTML/Javascript version of this library here: [oreid-webwidget](https://github.com/API-market/oreid-webwidget).

This library requires the  `oreid-js` npm package.

## Overview

This library works with oreid-js to provide a pop-up user experience for common ORE ID flows - like logging-in and signing a transaction


## How to use

### Installation

```
npm install oreid-js oreid-webwidget oreid-react
```

or

```
yarn add oreid-js oreid-webwidget oreid-react
```

After installation, initalize `oreid-js`. We recommend that you initialize it once during your application's bootstrap.

```ts
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { OreId } from "oreid-js";
import { WebWidget } from "oreid-webwidget";
import { OreidProvider } from "oreid-react";

let isInitialized;
const appId = "MY_APP_ID";
const oreId = new OreId({ appId, plugins:{ popup: WebWidget() }});

// initialize webWidget then render app
oreId.init().then(() => {
	isInitialized =true
})

ReactDOM.render(
	<React.StrictMode>
		<OreidProvider oreId={oreId}>
			{isInitialized && <div>Your App</div>}
		</OreidProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

```

### Auth

```ts
import React from "react";

export const Login: React.FunctionComponent = () => {

	const onClick = () => {
		oreId.popup.auth({
			provider: 'google'
		})
		.then(onSuccess)
		.catch(onError);
	};

	return <button onClick={onClick}>Login to Google</button>;
};
```

### Sign

```ts
import { useUser } from "oreid-react";
import React from "react";

export const Sign: React.FunctionComponent = () => {
	const user = useUser();

	const onClick = () => {
		const userChainAccounts = oreId.auth.user.data.chainAccounts;
    // get first Ethereum account in user’s OREID account
    const ethAccount = userChainAccounts.find(ca => ca.chainNetwork === 'eth_main')
		// transactionBody is blockchain transaction (differs by chainNetwork)
    const transactionBody = {
      from: "0xF478d…",
      to: "0xA200c…",
      value: "1"
    };

		oreId.createTransaction({
				transaction: transactionBody,
				chainAccount: ethAccount.chainAccount,
				chainNetwork: ethAccount.chainNetwork,
			}).then(transaction => {
				// have the user approve signature
				oreId.popup.sign({ transaction })
					.then({ transactionId } => { ... })
					.catch(onError);
			})
	};

	return <button onClick={onClick}>Sign Transaction</button>;
};
```

### Create New Blockchain Account

```ts
import React from "react";

export const NewChainAccount: React.FunctionComponent = () => {
	const onClick = () => {
		oreId.popup.newChainAccount({
			chainNetwork: 'eos-kylin',
		})
		.then({ chainAccount } => { ... })
		.catch(onError);
	};

	return <button onClick={onClick}>Create New Blockchain Account</button>;
};
```

### Helpers

```ts
import { useIsLoggedIn, useOreId, useUser, useWebWidget } from "oreid-react";
import React from "react";

export const Action: React.FunctionComponent = () => {
	const isLoggedIn = useIsLoggedIn(); // true or false
	const oreId = useOreId(); // current instance of oreid-js
	const user = useUser(); // current value of oreid.auth.user.data
	const webWidget = useWebWidget(); // current instance of oreid-webwidget
};
```
