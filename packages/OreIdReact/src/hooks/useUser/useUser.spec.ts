import { createTestOreId, renderHook } from "src/test-utils";
import { useUser } from "./useUser";

test("Should provide the user data on context", async () => {
	const oreId = createTestOreId();
	const user = { name: "test" };
	const hook = renderHook(() => useUser(), {
		oreId,
		user,
	});

	expect(hook.result.current).toBe(user);
});
