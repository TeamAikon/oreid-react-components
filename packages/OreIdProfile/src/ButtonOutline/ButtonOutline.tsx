import classNames from "classnames";
import React from "react";

import styles from "./ButtonOutline.module.scss";

interface ButtonOutlineProps extends React.HTMLProps<HTMLButtonElement> {
	fontColor?: string;
	type?: any
}

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
	fontColor = "#fff",
	className,
	children,
	...rest
}) => (
	<button
		className={classNames(styles.ButtonOutline, className)}
		style={{ color: fontColor, borderColor: fontColor }}
		{...rest}
	>
		{rest.label && (
			<span>{rest.label}</span>
		)}
		{children}
	</button>
);
