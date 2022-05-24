import React from "react";

import styles from "./Icon.module.scss";

interface IconProps {
	icon: string;
	size: number;
}

export const Icon: React.FC<IconProps> = ({ icon, size }) => {
	return (
		<img
			src={icon}
			className={styles.Icon}
			style={{ width: size, height: size }}
		/>
	);
};
