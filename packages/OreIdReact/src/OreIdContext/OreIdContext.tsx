import { createContext } from "react";
import { OreId, UserData } from "oreid-js";
import { OreIdWebWidget } from "oreid-webwidget";

export const OreIdContext = createContext<{
	oreId: OreId;
	webWidget: OreIdWebWidget;
	user: UserData | undefined;
	setUser: (user: UserData | undefined) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	accessToken: string | undefined;
	setAccessToken: (accessToken: string | undefined) => void;
}>({
	//@ts-ignore
	oreId: undefined,
	//@ts-ignore
	webWidget: undefined,
	user: undefined,
	setUser: () => undefined,
	isLoggedIn: false,
	setIsLoggedIn: () => undefined,
	accessToken: undefined,
	setAccessToken: () => undefined,
});
