import merge from "lodash/merge";
import { ChainNetwork, UserData } from "oreid-js";
import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useActionNewChainAccount = () => {
	const { webWidget, setUser } = useContext(OreIdContext);

	const onNewChainAccount = ({
		options,
		onSuccess,
		onError,
	}: {
		options: {
			accountType?: string;
			chainNetwork: ChainNetwork;
		};
		onError?: OnError;
		onSuccess?: (user: UserData) => void;
	}) => {
		const errorAction: OnError = (error) => {
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

		const successAction = (user: UserData) => {
			setUser(user);
			if (onSuccess) {
				onSuccess(user);
			}
		};

		webWidget.onNewChainAccount({
			options: defaultParams,
			onSuccess: successAction,
			onError: errorAction,
		});
	};

	return onNewChainAccount;
};
