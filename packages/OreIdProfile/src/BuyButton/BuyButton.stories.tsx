import React, { useState } from "react";
import { oreidForStorybook } from "../utils/mock-storybook";
import { BuyButton } from "./BuyButton";

export default {
	title: "BuyButton",
	component: BuyButton,
};

/* Rectangle */

const Template = (props: any) => {
	const [open, setOpen] = useState(true);
	return (
		<BuyButton
			{...props}
			anchor={<button onClick={() => setOpen(true)}>Open Modal</button>}
			onClose={() => setOpen(false)}
			open={open}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	oreId: oreidForStorybook,
};
