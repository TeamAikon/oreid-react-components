import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useUser } from "./useUser";

test("Should provide the user data on context", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const user = { name: "test" };
	const hook = renderHook(() => useUser(), {
		webWidget,
		oreId,
		user,
	});

	expect(hook.result.current).toBe(user);
});
