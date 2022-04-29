import { render, screen } from "@testing-library/react";
import React from "react";
import { createTestOreId } from "src/test-utils";
import { OreidProvider } from "./OreIdProvider";

jest.mock("../Observables", () => ({
	Observables: () => <div>Observable-Component</div>,
}));

test("Should render children", () => {
	const oreId = createTestOreId();
	render(
		<OreidProvider oreId={oreId}>
			<div>First</div>
			<div>Second</div>
		</OreidProvider>
	);
	screen.getByText("Observable-Component");
	screen.getByText("First");
	screen.getByText("Second");
});
