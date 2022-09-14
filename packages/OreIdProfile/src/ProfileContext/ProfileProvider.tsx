import React from "react";
import { ProfileContext } from "./ProfileContext";

interface Props {
	textColor: string;
	linkColor: string;
	backgroundColor: string;

	children: React.ReactNode;
}
export const ProfileProvider: React.FC<Props> = ({
	children,
	...profileProps
}) => {
	return (
		<ProfileContext.Provider value={{ ...profileProps }}>
			{children}
		</ProfileContext.Provider>
	);
};
