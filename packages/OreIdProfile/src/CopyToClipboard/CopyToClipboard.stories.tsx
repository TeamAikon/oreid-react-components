import React from "react";
import { CopyToClipboard } from "./CopyToClipboard";

export default {
	title: "CopyToClipboard",
	component: CopyToClipboard,
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
			<CopyToClipboard {...props}>Copy</CopyToClipboard>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	text: "Copy this text",
	className: "my-custom-class",
	onCopy: (args: any) => console.log("copy: ", { args }),
};
