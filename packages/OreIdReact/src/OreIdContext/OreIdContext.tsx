import { createContext } from "react";
import { OreId, UserData } from "oreid-js";
import { OreIdWebWidget } from "oreid-webwidget";

export const OreIdContext = createContext<{
	oreId: OreId;
	webWidget: OreIdWebWidget;
	user: UserData | undefined;
	setUser: (user: UserData | undefined) => void;
}>({
	//@ts-ignore
	oreId: undefined,
	//@ts-ignore
	webWidget: undefined,
	user: undefined,
	setUser: () => undefined,
});
