import { waitFor } from "@testing-library/react";
import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
	act,
} from "src/test-utils";
import { useUpdateUser } from "./useUpdateUser";

test("Should provide a function", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const hook = renderHook(() => useUpdateUser(), { webWidget, oreId });

	expect(typeof hook.result.current).toBe("function");
});

test("Should update user object", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();

	//@ts-ignore
	oreId.accessToken = "accessToken";
	(oreId.auth.user.getData as jest.Mock).mockImplementationOnce(async () => {
		//@ts-ignore
		oreId.auth.user.data = { name: "update" };
	});

	const { result, mock } = renderHook(() => useUpdateUser(), {
		webWidget,
		oreId,
	});

	act(() => {
		//@ts-ignore
		result.current();
	});
	expect(oreId.auth.user.getData).toBeCalledTimes(1);
	await waitFor(() => expect(mock.setUser).toBeCalledWith({ name: "update" }));
});
