import React from "react";

import styles from "./ButtonOutline.module.scss";

interface ButtonOutlineProps extends React.HTMLProps<HTMLButtonElement> {
	fontColor?: string;
	type?: any
}

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
	fontColor = "#fff",
	children,
	...rest
}) => (
	<button
		className={styles.ButtonOutline}
		style={{ color: fontColor, borderColor: fontColor }}
		{...rest}
	>
		<span>{rest.label}</span>
		{children}
	</button>
);
