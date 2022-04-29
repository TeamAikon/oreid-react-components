import { PopUpError, Transaction, WebWidgetSignResult } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import { getTransaction } from "./getTransaction";
import { CreateTransaction } from "./types";

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
		onError?: PopUpError;
		onSuccess?: (result: WebWidgetSignResult) => void;
	}) => {
		const errorAction: PopUpError = (error) => {
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
