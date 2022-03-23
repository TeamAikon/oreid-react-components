import { Transaction, WebWidgetSignResult } from "oreid-js";
import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import { getTransaction } from "./getTransaction";
import { CreateTransaction } from "./types";

export const useActionSign = () => {
	const { webWidget, oreId } = useContext(OreIdContext);

	const onSign = ({
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
		const errorAction: OnError = (error) => {
			if (!onError) {
				console.error(error);
				return;
			}
			onError(error);
		};

		getTransaction({
			transaction,
			createTransaction,
			oreId,
		})
			.then((transactionToSign) => {
				webWidget.onSign({
					transaction: transactionToSign,
					onError: errorAction,
					onSuccess: onSuccess,
				});
			})
			.catch((error) => {
				errorAction({ errors: error.message });
			});
	};

	return onSign;
};
