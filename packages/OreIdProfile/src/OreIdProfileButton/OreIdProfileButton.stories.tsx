import React from "react";
import { OreIdProfileButton } from "./OreIdProfileButton";

export default {
	title: "OreIdProfileButton",
	component: OreIdProfileButton,
};

const Template = (props: any) => {
	return (
		<div
			style={{
				background: "linear-gradient(135deg, #fff 0%, #270D76 100%)",
				padding: "50px",
			}}
		>
			<OreIdProfileButton {...props} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	oreId: {
		auth: {
			accountName: "accountName",
			subscribe: () => {},
			unsubscribe: () => {},
			isLoggedIn: true,
			logout: () => console.log("Logout"),
			user: {
				getData: async () => ({
					picture: "https://upload.wikimedia.org/wikipedia/commons/2/29/Solid_green.svg",
					name: "Bruno Motta",
					accountName: "accountName",
				}),
				data: {
					picture: "https://upload.wikimedia.org/wikipedia/commons/2/29/Solid_green.svg",
					name: "Bruno Motta",
					chainAccounts: [
						{
							chainAccount: 'accountName',
							chainNetwork: 'chain_network'
						}
					]					
				},
			},
		},
		popup: {
			buy: (buyParams) => console.log('buy!', buyParams)
		}
	},
	style: {
		backgroundColor: "red",
		linkColor: "blue",
		textColor: "green",
	},
};
