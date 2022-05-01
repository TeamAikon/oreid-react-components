import { createContext } from "react";
import { OreId, UserData } from "oreid-js";

export const OreIdContext = createContext<{
	oreId: OreId;
	user: UserData | undefined;
	setUser: (user: UserData | undefined) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	accessToken: string | undefined;
	setAccessToken: (accessToken: string | undefined) => void;
}>({
	//@ts-ignore
	oreId: undefined,
	user: undefined,
	setUser: () => undefined,
	isLoggedIn: false,
	setIsLoggedIn: () => undefined,
	accessToken: undefined,
	setAccessToken: () => undefined,
});
