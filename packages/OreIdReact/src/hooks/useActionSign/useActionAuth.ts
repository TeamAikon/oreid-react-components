import { Transaction, WebWidgetSignResult } from "oreid-js";
import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import { CreateTransaction } from "./types";
import { getTransaction } from "./getTransaction";

export const useActionSign = () => {
	const { webWidget, oreId } = useContext(OreIdContext);

	const onSign = async ({
		createTransaction,
		transaction,
		onSuccess,
		onError,
	}: {
		createTransaction?: CreateTransaction;
		transaction?: Transaction;
		onError?: OnError;
		onSuccess?: (result: WebWidgetSignResult) => void;
	}) => {
		const transactionToSign: Transaction = await getTransaction({
			transaction,
			createTransaction,
			oreId,
		});

		const errorAction: OnError = (error) => {
			if (!onError) {
				console.error(error);
				return;
			}
			onError(error);
		};

		const successAction = (result: WebWidgetSignResult) => {
			if (onSuccess) {
				onSuccess(result);
			}
		};

		webWidget.onSign({
			transaction: transactionToSign,
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onSign;
};
