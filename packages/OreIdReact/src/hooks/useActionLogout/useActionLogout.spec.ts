import { createTestOreId, renderHook } from "src/test-utils";
import { useActionLogout } from "./useActionLogout";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call oreId.popup?.logout", async () => {
	const oreId = createTestOreId();

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const hook = renderHook(() => useActionLogout(), { oreId });

	//@ts-ignore
	hook.result.current(params);

	expect(oreId.popup?.logout).toBeCalledWith({
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should send onSucess and onError to the webwidget", async () => {
	const oreId = createTestOreId();
	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const { result, mock } = renderHook(() => useActionLogout(), { oreId });

	(oreId.popup?.logout as jest.Mock).mockImplementationOnce((args: any) => {
		args.onSuccess();
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledWith(undefined);
	expect(onError).toBeCalledTimes(0);

	(oreId.popup?.logout as jest.Mock).mockImplementationOnce((args: any) => {
		args.onError({ errors: "Error" });
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(onError).toBeCalledTimes(1);
	expect(onError).toBeCalledWith({ errors: "Error" });
});
