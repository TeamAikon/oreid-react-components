import { render, screen } from "@testing-library/react";
import React from "react";
import { createTestOreId, createTestWebWidget } from "src/test-utils";
import { OreidProvider } from "./OreIdProvider";

test("Should render children", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	render(
		<OreidProvider oreId={oreId} webWidget={webWidget}>
			<div>First</div>
			<div>Second</div>
		</OreidProvider>
	);
	screen.getByText("First");
	screen.getByText("Second");
});
