import { createTestOreId, renderHook } from "src/test-utils";
import { useActionAuth } from "./useActionAuth";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call oreId.popup?.auth", async () => {
	const oreId = createTestOreId();
	const onError = jest.fn();
	const onSuccess = jest.fn();
	const params = { params: { provider: "my-provider" }, onError, onSuccess };

	const hook = renderHook(() => useActionAuth(), { oreId });

	//@ts-ignore
	hook.result.current(params);

	expect(oreId.popup?.auth).toBeCalledWith({
		params: {
			provider: "my-provider",
		},
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should be google the default provider", async () => {
	const oreId = createTestOreId();
	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const hook = renderHook(() => useActionAuth(), { oreId });

	//@ts-ignore
	hook.result.current(params);

	expect(oreId.popup?.auth).toBeCalledWith({
		params: { provider: "google" },
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should send onSucess and onError to the webwidget", async () => {
	const oreId = createTestOreId();
	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const { result, mock } = renderHook(() => useActionAuth(), { oreId });
	(oreId.popup?.auth as jest.Mock).mockImplementationOnce((args: any) => {
		args.onSuccess();
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledWith(undefined);
	expect(onError).toBeCalledTimes(0);

	(oreId.popup?.auth as jest.Mock).mockImplementationOnce((args: any) => {
		args.onError({ errors: "Error" });
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(onError).toBeCalledTimes(1);
	expect(onError).toBeCalledWith({ errors: "Error" });
});
