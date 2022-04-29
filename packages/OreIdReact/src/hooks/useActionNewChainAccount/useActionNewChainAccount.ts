import merge from "lodash/merge";
import { ChainNetwork, PopUpError } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useActionNewChainAccount = () => {
	const { oreId } = useContext(OreIdContext);

	const onNewChainAccount = ({
		options,
		onSuccess,
		onError,
	}: {
		options: {
			accountType?: string;
			chainNetwork: ChainNetwork;
		};
		onError?: PopUpError;
		onSuccess?: (result: {
			chainAccount: string;
			chainNetwork: ChainNetwork;
		}) => void;
	}) => {
		const errorAction: PopUpError = (error) => {
			if (!onError) {
				console.error(error);
				return;
			}
			onError(error);
		};

		const defaultParams: {
			accountType: string;
			chainNetwork: ChainNetwork;
		} = merge({ accountType: "native" }, options);

		if (!defaultParams.chainNetwork) {
			errorAction({ errors: "chainNetwork is required" });
			return;
		}

		const successAction = (chainAccount: string) => {
			if (onSuccess) {
				onSuccess({
					chainAccount,
					chainNetwork: options.chainNetwork,
				});
			}
		};

		oreId.popup?.newChainAccount({
			params: defaultParams,
			onSuccess: successAction,
			onError: errorAction,
		});
	};

	return onNewChainAccount;
};
