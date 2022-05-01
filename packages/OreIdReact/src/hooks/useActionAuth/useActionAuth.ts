import {
	AuthProvider,
	PopupPluginError,
	UserData,
	WebWidgetAuthParams,
	WebWidgetAuthResult
} from "oreid-js";

import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import merge from "lodash/merge";

type onSuccessResult =  WebWidgetAuthResult & { user: UserData }
type onErrorResult = { errors?: string; data?: any }

export const useActionAuth = () => {
	const { oreId, setUser } = useContext(OreIdContext);

	const onAuth = (input?: {
		params?: WebWidgetAuthParams;
		onError?: PopupPluginError;
		onSuccess?: (result: onSuccessResult) => void;
	}) => {
		const { params, onSuccess, onError } = input || {};
		const defaultParams = merge({ provider: AuthProvider.Google }, params);

		const errorAction: PopupPluginError = (errorResult: onErrorResult) => {
			if (!onError) {
				console.error(errorResult);
				return;
			}
			onError(errorResult);
		};

		const successAction = (result: onSuccessResult) => {
			setUser(result?.user);
			if (onSuccess) {
				onSuccess(result);
			}
		};

		oreId.popup?.auth({
			params: defaultParams,
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onAuth;
};
