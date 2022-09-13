import { ChainNetwork } from "oreid-js";

const userData = {
	picture:
		"https://upload.wikimedia.org/wikipedia/commons/2/29/Solid_green.svg",
	name: "Bruno Motta",
	chainAccounts: [
		{
			chainNetwork: ChainNetwork.EthMain,
			chainAccount: "0x18aCAE9A3487A753057805E789Ca1577A4306fbf",
		},
		{
			chainNetwork: ChainNetwork.EthRinkeby,
			chainAccount: "0x18aCBE9A3487A743057805E789Ca1577A4306fbf",
		},
		{
			chainNetwork: ChainNetwork.EthRopsten,
			chainAccount: "0x18aDDE9A3487A793057805E789Ca1577A4306fbf",
		},
		{
			chainNetwork: ChainNetwork.EthGoerli,
			chainAccount: "0x18aECE9A3487A113057805E789Ca1577A4306fbf",
		},
		{
			chainNetwork: ChainNetwork.EthMain,
			chainAccount: "0x18aFCE9A3487A772157805E789Ca1577A4306fff",
		},
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
