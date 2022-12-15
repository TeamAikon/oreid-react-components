import React, { useEffect } from "react";
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

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!oreId.isInitialized) {
			oreId.init();
		}
	}, []);

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
