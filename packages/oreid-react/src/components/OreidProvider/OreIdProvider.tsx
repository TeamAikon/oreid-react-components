import React from "react";
import { OreId, UserData } from "oreid-js";
import { OreIdWebWidget } from "oreid-webwidget";
import { OreIdContext } from "src/OreIdContext";
import { useState } from "react";

interface IOreId extends OreId {}
interface IOreIdWebWidget extends OreIdWebWidget {}

interface Props {
	oreId: IOreId;
	webWidget: IOreIdWebWidget;
}
export const OreidProvider: React.FC<Props> = ({
	children,
	oreId,
	webWidget,
}) => {
	const [user, setUser] = useState<UserData | undefined>(undefined);

	return (
		<OreIdContext.Provider value={{ oreId, webWidget, user, setUser }}>
			{children}
		</OreIdContext.Provider>
	);
};
