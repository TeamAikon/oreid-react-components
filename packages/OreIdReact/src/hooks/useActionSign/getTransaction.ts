import merge from "lodash/merge";
import { OreId, Transaction, TransactionSignOptions } from "oreid-js";
import { CreateTransaction } from "./types";

export const getTransaction = async ({
	createTransaction,
	transaction,
	oreId,
}: {
	oreId: OreId;
	createTransaction?: CreateTransaction;
	transaction?: Transaction;
}): Promise<Transaction> => {
	if (!transaction && !createTransaction) {
		throw new Error("Either transaction or createTransaction must be provided");
	}
	if (transaction && createTransaction) {
		throw new Error(
			"Only one of transaction or createTransaction can be provided"
		);
	}
	if (transaction) {
		if(transaction?.autoSign === undefined) {
			throw new Error('"transaction" must be an instance of Transaction');
		}
		if (!(transaction instanceof Transaction)) {
				console.log('warning: verion mismatch of oreid-js between oreid-react and your app')
		}
		return transaction;
	}

	if (!createTransaction) {
		throw new Error(
			"This error is impossible to happen. It's only here because of the typescript"
		);
	}

	const defaultSignOptions: TransactionSignOptions = merge(
		{ broadcast: true },
		createTransaction.signOptions
	);

	return oreId.createTransaction({
		...createTransaction.transactionData,
		signOptions: defaultSignOptions,
	});
};
