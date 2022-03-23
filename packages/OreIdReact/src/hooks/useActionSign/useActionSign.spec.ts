import { Transaction } from "oreid-js";
import * as helper from "./getTransaction";
import {
	createTestOreId,
	createTestWebWidget,
	renderHook,
} from "src/test-utils";
import { useActionSign } from "./useActionSign";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
	jest.resetAllMocks();
});

test("Should call webWidget.onSign when getTransaction succeeded", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const transaction = Object.create(Transaction.prototype);

	const spy = jest.spyOn(helper, "getTransaction");
	spy.mockResolvedValue(transaction);

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { transaction, onError, onSuccess };

	const hook = renderHook(() => useActionSign(), {
		webWidget,
		oreId,
	});

	expect(spy).toBeCalledTimes(0);

	//@ts-ignore
	hook.result.current(params);

	expect(spy).toBeCalledWith({
		transaction,
		createTransaction: undefined,
		oreId,
	});

	await waitFor(() =>
		expect(webWidget.onSign).toBeCalledWith({
			transaction,
			onSuccess,
			onError: expect.any(Function),
		})
	);
});

test("Should call not webWidget.onSign when getTransaction fails", async () => {
	const oreId = createTestOreId();
	const webWidget = createTestWebWidget();
	const transaction = Object.create(Transaction.prototype);

	const spy = jest.spyOn(helper, "getTransaction");
	spy.mockRejectedValue(new Error("test"));

	const onError = jest.fn();
	const onSuccess = jest.fn();

	const params = { transaction, onError, onSuccess };

	const hook = renderHook(() => useActionSign(), {
		webWidget,
		oreId,
	});

	expect(spy).toBeCalledTimes(0);

	//@ts-ignore
	hook.result.current(params);

	expect(spy).toBeCalledWith({
		transaction,
		createTransaction: undefined,
		oreId,
	});

	await waitFor(() => expect(onError).toBeCalledWith({ errors: "test" }));
});
