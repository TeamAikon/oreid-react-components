import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useActionLogout } from "./useActionLogout";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call webWidget.onLogout", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const hook = renderHook(() => useActionLogout(), {
		webWidget,
		oreId,
	});

	//@ts-ignore
	hook.result.current(params);

	expect(webWidget.onLogout).toBeCalledWith({
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should send onSucess and onError to the webwidget", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { onError, onSuccess };

	const { result, mock } = renderHook(() => useActionLogout(), {
		webWidget,
		oreId,
	});

	(webWidget.onLogout as jest.Mock).mockImplementationOnce((args: any) => {
		args.onSuccess();
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledWith(undefined);
	expect(onError).toBeCalledTimes(0);

	(webWidget.onLogout as jest.Mock).mockImplementationOnce((args: any) => {
		args.onError({ errors: "Error" });
	});

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(mock.setUser).toBeCalledTimes(1);
	expect(onError).toBeCalledTimes(1);
	expect(onError).toBeCalledWith({ errors: "Error" });
});
