import { ChainNetwork } from "oreid-js";

const userData = {
	picture:
		"https://upload.wikimedia.org/wikipedia/commons/2/29/Solid_green.svg",
	name: "Bruno Motta",
	chainAccounts: [
		{ chainNetwork: ChainNetwork.EthMain },
		{ chainNetwork: ChainNetwork.EthRinkeby },
		{ chainNetwork: ChainNetwork.EthRopsten },
		{ chainNetwork: ChainNetwork.EthGoerli },
		{ chainNetwork: ChainNetwork.EthMain },
	],
};

export const oreidForStorybook = {
	isInitialized: true,
	auth: {
		accountName: "accountName",
		subscribe: () => {},
		unsubscribe: () => {},
		isLoggedIn: true,
		logout: () => console.log("Logout"),
		user: {
			subscribe: () => {},
			unsubscribe: () => {},
			getData: async () => userData,
			data: userData,
		},
	},
	popup: {
		buy: (buyParams: any) => console.log("buy!", buyParams),
	},
};
