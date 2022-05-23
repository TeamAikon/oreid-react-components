import React from "react";
import classNames from "classnames";

import "./Button.scss";

interface ButtonProps {
	onClick: () => void;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	disabled,
}) => {
	const cls = disabled ? "disabled" : "";
	return (
		<button
			className={classNames("oreId-profile-button", cls)}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
