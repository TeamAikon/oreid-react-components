import { PopupPluginError, Transaction, WebWidgetSignResult } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import { getTransaction } from "./getTransaction";
import { CreateTransaction } from "./types";

type onErrorResult = { errors?: string; data?: any }

export const useActionSign = () => {
	const { oreId } = useContext(OreIdContext);

	const onSign = ({
		createTransaction,
		transaction,
		onSuccess,
		onError,
	}: {
		createTransaction?: CreateTransaction;
		transaction?: Transaction;
		onError?: PopupPluginError;
		onSuccess?: (result: WebWidgetSignResult) => void;
	}) => {
		const errorAction: PopupPluginError = (errorResult: onErrorResult) => {
			if (!onError) {
				console.error(errorResult);
				return;
			}
			onError(errorResult);
		};

		getTransaction({
			transaction,
			createTransaction,
			oreId,
		})
			.then((transactionToSign) => {
				oreId.popup?.sign({
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
