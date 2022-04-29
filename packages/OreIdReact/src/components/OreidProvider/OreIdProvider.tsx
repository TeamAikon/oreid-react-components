import React from "react";
import { OreId, UserData } from "oreid-js";
import { OreIdContext } from "src/OreIdContext";
import { useState } from "react";
import { Observables } from "../Observables";

interface Props {
	oreId: OreId;

	children: React.ReactNode;
}
export const OreidProvider: React.FC<Props> = ({ children, oreId }) => {
	const [user, setUser] = useState<UserData | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

	if (!oreId.popup) {
		throw new Error(
			"oreId popup must be initialized. Make sure you added the plugin and called oreId.init()"
		);
	}

	return (
		<OreIdContext.Provider
			value={{
				oreId,
				user,
				setUser,
				isLoggedIn,
				setIsLoggedIn,
				accessToken,
				setAccessToken,
			}}
		>
			<Observables />
			{children}
		</OreIdContext.Provider>
	);
};
