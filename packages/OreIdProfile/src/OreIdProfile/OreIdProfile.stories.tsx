import React, { useState } from "react";
import { OreIdProfile } from "./OreIdProfile";

export default {
	title: "OreIdProfile",
	component: OreIdProfile,
};

/* Rectangle */

const Template = (props: any) => {
	const [open, setOpen] = useState(true);
	return (
		<div
			style={{
				background: "linear-gradient(135deg, #151F44 0%, #270D76 100%)",
				padding: "50px",
			}}
		>
			<OreIdProfile
				{...props}
				anchor={<button onClick={() => setOpen(true)}>Open Modal</button>}
				onClose={() => setOpen(false)}
				open={open}
			/>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	oreId: {
		auth: {
			accountName: "accountName",
			isLoggedIn: true,
			logout: () => console.log("Logout"),
			user: {
				getData: async () => console.log("getData"),
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
