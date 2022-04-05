import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useIsLoggedIn } from "./useIsLoggedIn";

test("Should provide isLoggedIn on context: true", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const user = { name: "test" };
	const hook = renderHook(() => useIsLoggedIn(), {
		webWidget,
		oreId,
		user,
		isLoggedIn: true,
	});

	expect(hook.result.current).toBe(true);
});

test("Should provide isLoggedIn on context: false", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const user = { name: "test" };
	const hook = renderHook(() => useIsLoggedIn(), {
		webWidget,
		oreId,
		user,
		isLoggedIn: false,
	});

	expect(hook.result.current).toBe(false);
});
