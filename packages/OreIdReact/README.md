# ORE ID React Library
Popup User Experience and React helpers for ORE ID

This library should be used in a React application. If you aren't using React, you should use the generic web version of this library instead rad `oreid-webwidget`.
This library uses `oreid-webwidget` and `oreid-js`.

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

After installation, initalize `oreid-js` and `oreid-webwidget`. Currently only 1 instance of the web widget is supported. For this reason, we recommend that you initialize both, `oreid-js` and `oreid-webwidget`, during your application's bootstrap.

```ts
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { OreId } from "oreid-js";
import { createOreIdWebWidget } from "oreid-webwidget";
import { OreidProvider } from "oreid-react";

const appId = "MY_APP_ID";
const apiKey = "MY_API_KEY";

const oreId = new OreId({ appId, apiKey });
let webWidget;

// initialize webWidget then render app
createOreIdWebWidget(oreId, window).then(oreIdWebWidget => {
	webWidget = oreIdWebWidget 
	renderApp()
})

const renderApp = () => {
	ReactDOM.render(
		<React.StrictMode>
			<OreidProvider oreId={oreId} webWidget={webWidget}>
				<App />
			</OreidProvider>
		</React.StrictMode>,
		document.getElementById("root")
	);
}
```

### Auth

```ts
import { AuthProvider } from "oreid-js";
import { useActionAuth } from "oreid-react";
import React from "react";

export const Action: React.FunctionComponent = () => {
	const onAuth = useActionAuth();

	const onClick = () => {
		onAuth({
			// optional
			params: { provider: AuthProvider.Google },

			onError: console.error,
			onSuccess: console.log,
		});
	};

	return <button onClick={onClick}>Action</button>;
};
```

### Sign

```ts
import { useActionSign, useUser } from "oreid-react";
import React from "react";

export const Action: React.FunctionComponent = () => {
	const onSign = useActionSign();
	const user = useUser();

	const onClick = () => {
		if (!user) return;

		const transactionData = {
			account: "demoapphello",
			name: "hi",
			authorization: [
				{
					actor: user.chainAccounts[0].chainAccount,
					permission: user.chainAccounts[0].defaultPermission?.name || "",
				},
			],
			data: {
				user: user.chainAccounts[0].chainAccount,
			},
		};

		onSign({
			createTransaction: {
				transaction: transactionData,
				chainAccount: user.chainAccounts[0].chainAccount,
				chainNetwork: user.chainAccounts[0].chainNetwork,
			},
			onError: console.error,
			onSuccess: console.log,
		});
	};

	return <button onClick={onClick}>Action</button>;
};
```

### Create New Blockchain Account

```ts
import { ChainNetwork } from "oreid-js";
import { useActionNewChainAccount } from "oreid-react";
import React from "react";

export const Action: React.FunctionComponent = () => {
	const onNewChainAccount = useActionNewChainAccount();

	const onClick = () => {
		onNewChainAccount({
			options: { chainNetwork: ChainNetwork.EosKylin },
			onSuccess: console.log,
			onError: console.error,
		});
	};

	return <button onClick={onClick}>Action</button>;
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
