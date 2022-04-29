import {
	AuthProvider,
	PopUpError,
	UserData,
	WebWidgetAuthParams,
} from "oreid-js";

import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import merge from "lodash/merge";

export const useActionAuth = () => {
	const { oreId, setUser } = useContext(OreIdContext);

	const onAuth = (input?: {
		params?: WebWidgetAuthParams;
		onError?: PopUpError;
		onSuccess?: (user: UserData) => void;
	}) => {
		const { params, onSuccess, onError } = input || {};
		const defaultParams = merge({ provider: AuthProvider.Google }, params);

		const errorAction: PopUpError = (error) => {
			if (!onError) {
				console.error(error);
				return;
			}
			onError(error);
		};

		const successAction = (user: UserData) => {
			setUser(user);
			if (onSuccess) {
				onSuccess(user);
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
