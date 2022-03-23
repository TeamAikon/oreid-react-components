import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useOreId } from "./useOreId";

test("Should provide oreId instance", () => {
	const oreId = createTestOreId();
	const oreId2 = createTestOreId();
	const webWidget = createTestWebWidget();
	const hook = renderHook(() => useOreId(), { webWidget, oreId });

	expect(hook.result.current).toBe(oreId);
	expect(hook.result.current).not.toBe(oreId2);
});
