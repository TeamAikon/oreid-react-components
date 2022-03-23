import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useWebWidget } from "./useWebWidget";

test("Should provide oreId instance", () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const webWidget2 = createTestWebWidget();
	const hook = renderHook(() => useWebWidget(), { webWidget, oreId });

	expect(hook.result.current).toBe(webWidget);
	expect(hook.result.current).not.toBe(webWidget2);
});
