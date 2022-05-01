import { createTestOreId, renderHook } from "src/test-utils";
import { useActionNewChainAccount } from "./useActionNewChainAccount";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call oreId.popup?.newChainAccount", async () => {
	const oreId = createTestOreId();

	const options = { chainNetwork: "chainNetwork" };

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const hook = renderHook(() => useActionNewChainAccount(), { oreId });

	//@ts-ignore
	hook.result.current(params);

	expect(oreId.popup?.newChainAccount).toBeCalledWith({
		params: { accountType: "native", chainNetwork: "chainNetwork" },
		onSuccess: expect.any(Function),
		onError: expect.any(Function),
	});
});

test("Should not call oreId.popup?.newChainAccount if chainNetwork is not provided", async () => {
	const oreId = createTestOreId();
	const options = {};

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const hook = renderHook(() => useActionNewChainAccount(), { oreId });

	//@ts-ignore
	hook.result.current(params);

	expect(onError).toBeCalledWith({ errors: "chainNetwork is required" });
	expect(oreId.popup?.newChainAccount).not.toBeCalled();
});

test("Should send onSucess and onError to the webwidget", async () => {
	const oreId = createTestOreId();
	const options = { chainNetwork: "chainNetwork" };

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { options, onError, onSuccess };

	const { result } = renderHook(() => useActionNewChainAccount(), { oreId });

	(oreId.popup?.newChainAccount as jest.Mock).mockImplementationOnce(
		(args: any) => {
			args.onSuccess({ chainAccount: "chainAccount"});
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

	(oreId.popup?.newChainAccount as jest.Mock).mockImplementationOnce(
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
