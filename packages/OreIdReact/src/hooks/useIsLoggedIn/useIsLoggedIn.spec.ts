import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useIsLoggedIn } from "./useIsLoggedIn";

test("Should return true when oreId.auth.isLoggedIn is true", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();

	//@ts-ignore
	oreId.auth.isLoggedIn = true;

	const hook = renderHook(() => useIsLoggedIn(), { webWidget, oreId });
	expect(hook.result.current).toBe(true);
});

test("Should return false when oreId.auth.isLoggedIn is false", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();

	//@ts-ignore
	oreId.auth.isLoggedIn = false;

	const hook = renderHook(() => useIsLoggedIn(), { webWidget, oreId });
	expect(hook.result.current).toBe(false);
});
