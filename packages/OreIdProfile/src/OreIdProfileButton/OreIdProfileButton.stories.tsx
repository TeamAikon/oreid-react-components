import React from "react";
import { OreIdProfileButton } from "./OreIdProfileButton";
import { oreidForStorybook } from "../utils/mock-storybook";

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
	oreId: oreidForStorybook,
	style: {
		backgroundColor: "red",
		linkColor: "blue",
		textColor: "green",
	},
};
