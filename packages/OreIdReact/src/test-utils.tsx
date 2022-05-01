import { renderHook } from "@testing-library/react-hooks";
import { OreId } from "oreid-js";
import React from "react";
import { OreIdContext } from "./OreIdContext";

export const createTestOreId = () => {
	return {
		createTransaction: jest.fn(),
		auth: {
			user: {
				hasData: jest.fn(),
				getData: jest.fn(),
				subscribe: jest.fn(),
				unsubscribe: jest.fn(),
			},
			subscribe: jest.fn(),
			unsubscribe: jest.fn(),
		},
		popup: {
			auth: jest.fn(),
			logout: jest.fn(),
			newChainAccount: jest.fn(),
			sign: jest.fn(),
		},
	} as unknown as OreId;
};

export const customRenderHook = (
	call: () => void,
	{
		oreId,
		user,
		isLoggedIn = true,
		accessToken = "",
	}: {
		oreId: OreId;
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
