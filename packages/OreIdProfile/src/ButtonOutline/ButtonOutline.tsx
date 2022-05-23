import React from "react";

import "./ButtonOutline.scss";

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
		className="oreId-profile-buttonOutline"
		style={{ color: fontColor, borderColor: fontColor }}
		onClick={onClick}
	>
		<span>{label}</span>
	</button>
);
