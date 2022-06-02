import React from "react";
import { Icon } from "./Icon";

export default {
	title: "Icon",
	component: Icon,
	argTypes: {
		size: {
			control: { type: "number", min: 1 },
		},
	},
};

/* Rectangle */

const Template = (props: any) => {
	return (
		<div
			style={{
				background: "linear-gradient(135deg, #151F44 0%, #270D76 100%)",
				padding: "50px",
			}}
		>
			<Icon {...props} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Solid_green.svg",
	size: 20,
};
