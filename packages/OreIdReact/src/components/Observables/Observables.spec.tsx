import {
	render as renderTest,
	RenderOptions,
	waitFor,
} from "@testing-library/react";
import React from "react";
import { createTestOreId, createTestWebWidget } from "src/test-utils";
import { Observables } from "./Observables";
import { OreIdContext } from "src/OreIdContext";
import { OreIdWebWidget } from "oreid-webwidget";
import { OreId } from "oreid-js";

interface Options extends RenderOptions {
	providerProps: {
		oreId: OreId;
		webWidget: OreIdWebWidget;
		user: any;
		setUser: (user: any) => void;
		isLoggedIn: boolean;
		setIsLoggedIn: (isLoggedIn: boolean) => void;
		accessToken: string | undefined;
		setAccessToken: (accessToken: string | undefined) => void;
	};
}

const render = (
	ui: JSX.Element,
	{ providerProps, ...renderOptions }: Options
) => {
	return renderTest(
		<OreIdContext.Provider
			value={{
				...providerProps,
			}}
		>
			{ui}
		</OreIdContext.Provider>,
		renderOptions
	);
};

test("Should render children", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const setUser = jest.fn();
	const setAccessToken = jest.fn();
	const setIsLoggedIn = jest.fn();

	expect(oreId.auth.subscribe).not.toBeCalled();

	render(<Observables />, {
		providerProps: {
			oreId,
			webWidget,
			user: undefined,
			setUser,
			accessToken: "",
			isLoggedIn: false,
			setAccessToken,
			setIsLoggedIn,
		},
	});

	await waitFor(() => {
		expect(oreId.auth.subscribe).toBeCalledTimes(1);
		expect(oreId.auth.user.subscribe).toBeCalledTimes(1);
	});
});
