import { PopupPluginError } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

type onErrorResult = { errors?: string; data?: any }

export const useActionLogout = () => {
	const { oreId, setUser } = useContext(OreIdContext);

	const onLogout = (input?: {
		onError?: PopupPluginError;
		onSuccess?: () => void;
	}) => {
		const { onSuccess = undefined, onError = undefined } = input || {};
		const errorAction: PopupPluginError = (errorResult: onErrorResult) => {
			if (!onError) {
				console.error(errorResult);
				return;
			}
			onError(errorResult);
		};

		const successAction = () => {
			setUser(undefined);
			if (onSuccess) {
				onSuccess();
			}
		};

		oreId.popup?.logout({
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onLogout;
};
