import React, { useState } from "react";
import { Loading } from "../Loading";
import { FloatBox } from "./FloatBox";

export default {
	title: "FloatBox",
	component: FloatBox,
};

const FloatBoxExample = (props: any) => {
	const [open, setOpen] = useState(true);
	return (
		<>
			<button onClick={() => setOpen(true)}>Open FloatBox</button>
			<br />
			{open && (
				<FloatBox onClose={() => setOpen(false)}>
					<div>
						FloatBox CONTENT EXAMPLE
						<Loading />
						FloatBox CONTENT EXAMPLE
					</div>
				</FloatBox>
			)}
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
