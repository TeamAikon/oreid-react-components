import React from "react";

import "./Icon.scss";

interface IconProps {
	icon: string;
	size: number;
}

export const Icon: React.FC<IconProps> = ({ icon, size }) => {
	return (
		<img
			src={icon}
			className="oreId-profile-Icon"
			style={{ width: size, height: size }}
		/>
	);
};
