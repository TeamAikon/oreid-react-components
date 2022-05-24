import React from "react";

import styles from "./ButtonOutline.module.scss";

interface ButtonOutlineProps {
	fontColor?: string;
	label: string;
	onClick: () => void;
}

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({
	onClick,
	label,
	fontColor = "#fff",
}) => (
	<button
		className={styles.ButtonOutline}
		style={{ color: fontColor, borderColor: fontColor }}
		onClick={onClick}
	>
		<span>{label}</span>
	</button>
);
