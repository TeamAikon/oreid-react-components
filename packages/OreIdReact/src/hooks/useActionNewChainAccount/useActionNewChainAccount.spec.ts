import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useActionNewChainAccount } from "./useActionNewChainAccount";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call webWidget.onNewChainAccount", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const options = { chainNetwork: "chainNetwork" };

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const hook = renderHook(() => useActionNewChainAccount(), {
		webWidget,
		oreId,
	});

	//@ts-ignore
	hook.result.current(params);

	expect(webWidget.onNewChainAccount).toBeCalledWith({
		params: { accountType: "native", chainNetwork: "chainNetwork" },
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should not call webWidget.onNewChainAccount if chainNetwork is not provided", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const options = {};

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const hook = renderHook(() => useActionNewChainAccount(), {
		webWidget,
		oreId,
	});

	//@ts-ignore
	hook.result.current(params);

	expect(onError).toBeCalledWith({ errors: "chainNetwork is required" });
	expect(webWidget.onNewChainAccount).not.toBeCalled();
});

test("Should send onSucess and onError to the webwidget", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const options = { chainNetwork: "chainNetwork" };

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const { result } = renderHook(() => useActionNewChainAccount(), {
		webWidget,
		oreId,
	});

	(webWidget.onNewChainAccount as jest.Mock).mockImplementationOnce(
		(args: any) => {
			args.onSuccess("chainAccount");
		}
	);

	//@ts-ignore
	result.current(params);

	expect(onSuccess).toBeCalledTimes(1);
	expect(onSuccess).toBeCalledWith({
		chainAccount: "chainAccount",
		chainNetwork: "chainNetwork",
	});
	expect(onError).toBeCalledTimes(0);

	(webWidget.onNewChainAccount as jest.Mock).mockImplementationOnce(
		(args: any) => {
			args.onError({ errors: "Error" });
		}
	);

	//@ts-ignore
	result.current(params);
	expect(onSuccess).toBeCalledTimes(1);
	expect(onError).toBeCalledTimes(1);
	expect(onError).toBeCalledWith({ errors: "Error" });
});
