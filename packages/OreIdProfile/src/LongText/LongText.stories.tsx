import React from "react";
import { LongText } from "./LongText";

export default {
	title: "LongText",
	component: LongText,
};

const Template = (props: any) => {
	return (
		<div
			style={{
				background: "linear-gradient(135deg, #151F44 0%, #270D76 100%)",
				color: "#fff",
				padding: "50px",
			}}
		>
			<LongText {...props}>Copy</LongText>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	text: "BinB8eTpRYkQWmkYcE4YHBzb7a2pyPeioxYkGEBgoTSW",
	className: "my-custom-className",
	href: "https://www.google.com/",
	truncateInMiddle: true,
	showCopy: true,
	onCopy: (...args: any) => console.log("onCopy: ", { args }),
	onClick: (...args: any) => console.log("onClick: ", { args }),
};
