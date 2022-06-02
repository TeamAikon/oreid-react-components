import React, { useState } from "react";
import { FloatBox } from "./FloatBox";

export default {
	title: "FloatBox",
	component: FloatBox,
};

const FloatBoxExample = (props: any) => {
	const [open, setOpen] = useState(true);
	return (
		<>
			<FloatBox
				{...props}
				anchor={<button onClick={() => setOpen(true)}>Open FloatBox</button>}
				width={300}
				onClose={() => setOpen(false)}
				open={open}
			>
				<div>FloatBox CONTENT EXAMPLE</div>
			</FloatBox>

			<div style={{ color: "#fff" }}>Text that must be under the component</div>
		</>
	);
};

const Template = (props: any) => {
	return (
		<div
			style={{
				background: "linear-gradient(135deg, #151F44 0%, #270D76 100%)",
				padding: "50px",
			}}
		>
			<FloatBoxExample {...props} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {};
