import { renderHook } from "@testing-library/react-hooks";
import { OreId } from "oreid-js";
import { OreIdWebWidget } from "oreid-webwidget";
import React from "react";
import { OreIdContext } from "./OreIdContext";

export const createTestOreId = () => {
	return {
		createTransaction: jest.fn(),
		auth: {
			user: {
				getData: jest.fn(),
				subscribe: jest.fn(),
				unsubscribe: jest.fn(),
			},
			subscribe: jest.fn(),
			unsubscribe: jest.fn(),
		},
	} as unknown as OreId;
};

export const createTestWebWidget = () => {
	return {
		onSign: jest.fn(),
		onNewChainAccount: jest.fn(),
		onLogout: jest.fn(),
		onAuth: jest.fn(),
	} as unknown as OreIdWebWidget;
};

export const customRenderHook = (
	call: () => void,
	{
		oreId,
		webWidget,
		user,
		isLoggedIn = true,
		accessToken = "",
	}: {
		oreId: OreId;
		webWidget: OreIdWebWidget;
		user?: any;
		isLoggedIn?: boolean;
		accessToken?: string;
	}
) => {
	const setUser = jest.fn();
	const setIsLoggedIn = jest.fn();
	const setAccessToken = jest.fn();
	const wrapper = ({ children }: any) => (
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
			{children}
		</OreIdContext.Provider>
	);

	const result = renderHook(call, { wrapper });
	return { ...result, mock: { setUser, setIsLoggedIn, setAccessToken } };
};

export * from "@testing-library/react-hooks";
export { customRenderHook as renderHook };
