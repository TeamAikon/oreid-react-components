import { createTestOreId, renderHook } from "src/test-utils";
import { useIsLoggedIn } from "./useIsLoggedIn";

test("Should provide isLoggedIn on context: true", () => {
	const oreId = createTestOreId();
	const user = { name: "test" };
	const hook = renderHook(() => useIsLoggedIn(), {
		oreId,
		user,
		isLoggedIn: true,
	});

	expect(hook.result.current).toBe(true);
});

test("Should provide isLoggedIn on context: false", () => {
	const oreId = createTestOreId();
	const user = { name: "test" };
	const hook = renderHook(() => useIsLoggedIn(), {
		oreId,
		user,
		isLoggedIn: false,
	});

	expect(hook.result.current).toBe(false);
});
