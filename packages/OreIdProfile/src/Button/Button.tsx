import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
	onClick: () => void;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	disabled,
}) => {
	return (
		<button className={styles.Button} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};
