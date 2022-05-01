import merge from "lodash/merge";
import { ChainNetwork, PopupPluginError, WebWidgetNewChainAccountResult } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

type onSuccessResult = WebWidgetNewChainAccountResult & { chainNetwork: ChainNetwork }
type onErrorResult = { errors?: string; data?: any }

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
		onError?: PopupPluginError;
		onSuccess?: (result: onSuccessResult) => void;
	}) => {
		const errorAction: PopupPluginError = (errorResult: onErrorResult) => {
			if (!onError) {
				console.error(errorResult);
				return;
			}
			onError(errorResult);
		};

		const defaultParams: {
			accountType: string;
			chainNetwork: ChainNetwork;
		} = merge({ accountType: "native" }, options);

		if (!defaultParams.chainNetwork) {
			errorAction({ errors: "chainNetwork is required" });
			return;
		}

		const successAction = (result: WebWidgetNewChainAccountResult) => {
			if (onSuccess) {
				onSuccess({
					...result,
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
