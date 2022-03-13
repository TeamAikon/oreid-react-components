import merge from "lodash/merge";
import {
	ChainNetwork,
	CreateTransactionData,
	TransactionSignOptions,
	WebWidgetSignResult,
} from "oreid-js";
import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

interface CreateTransaction extends Omit<CreateTransactionData, "signOptions"> {
	chainAccount: string;
	chainNetwork: ChainNetwork;
}

export const useActionSign = () => {
	const { webWidget, oreId } = useContext(OreIdContext);

	const onSign = async ({
		createTransaction,
		signOptions,
		onSuccess,
		onError,
	}: {
		createTransaction: CreateTransaction;
		signOptions?: TransactionSignOptions;
		onError?: OnError;
		onSuccess?: (result: WebWidgetSignResult) => void;
	}) => {
		const defaultSignOptions: TransactionSignOptions = merge(
			{ broadcast: true },
			signOptions
		);
		const transaction = await oreId.createTransaction({
			...createTransaction,
			signOptions: defaultSignOptions,
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
			//@ts-ignore
			transaction,
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onSign;
};
