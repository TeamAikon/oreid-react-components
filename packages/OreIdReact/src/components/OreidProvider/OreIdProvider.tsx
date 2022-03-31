import React from "react";
import { OreId, UserData } from "oreid-js";
import { OreIdWebWidget } from "oreid-webwidget";
import { OreIdContext } from "src/OreIdContext";
import { useState } from "react";
import { Observables } from "../Observables";

interface Props {
	oreId: OreId;
	webWidget: OreIdWebWidget;
}
export const OreidProvider: React.FC<Props> = ({
	children,
	oreId,
	webWidget,
}) => {
	const [user, setUser] = useState<UserData | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

	return (
		<OreIdContext.Provider
			value={{
				oreId,
				webWidget,
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
