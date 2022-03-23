import { waitFor } from "@testing-library/react";
import { Transaction } from "oreid-js";
import { createTestOreId } from "src/test-utils";
import { getTransaction } from "./getTransaction";

test("Should fail if has no Transaction or CreateTransaction", async () => {
	const oreId = createTestOreId();
	const result = getTransaction({ oreId });
	expect(result instanceof Promise).toBe(true);
	await waitFor(() =>
		expect(result).rejects.toThrow(
			"Either transaction or createTransaction must be provided"
		)
	);
});

test("Should fail if has both Transaction and CreateTransaction", async () => {
	const oreId = createTestOreId();
	const result = getTransaction({
		oreId,
		transaction: {} as any,
		createTransaction: {} as any,
	});
	expect(result instanceof Promise).toBe(true);
	await waitFor(() =>
		expect(result).rejects.toThrow(
			"Only one of transaction or createTransaction can be provided"
		)
	);
});

test("Should call oreId.createTransaction if createTransaction was provided", async () => {
	const oreId = createTestOreId();
	const createTransaction: any = {
		transactionData: {
			chainAccount: "chainAccount",
			chainNetwork: "chainNetwork",
		},
	};

	const result = getTransaction({ oreId, createTransaction });
	expect(result instanceof Promise).toBe(true);

	expect(oreId.createTransaction).toHaveBeenCalledWith({
		chainAccount: "chainAccount",
		chainNetwork: "chainNetwork",
		signOptions: { broadcast: true },
	});
});

test("Should fail if transaction is not a instance of Transaction", async () => {
	const oreId = createTestOreId();
	const transaction: any = {};

	const result = getTransaction({ oreId, transaction });

	expect(result instanceof Promise).toBe(true);
	await waitFor(() =>
		expect(result).rejects.toThrow(
			'"transaction" must be an instance of Transaction'
		)
	);
});

test("Should return transaction it is a instance of Transaction", async () => {
	const oreId = createTestOreId();
	const transaction = Object.create(Transaction.prototype);
	const result = getTransaction({ oreId, transaction });
	expect(result instanceof Promise).toBe(true);
	await waitFor(() => expect(result).resolves.toBe(transaction));
});
