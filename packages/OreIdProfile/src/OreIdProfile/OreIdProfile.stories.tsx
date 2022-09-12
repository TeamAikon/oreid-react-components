import React, { useState } from "react";
import { oreidForStorybook } from "../utils/mock-storybook";
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
	oreId: oreidForStorybook,
	style: {
		backgroundColor: "red",
		linkColor: "blue",
		textColor: "green",
	},
};
