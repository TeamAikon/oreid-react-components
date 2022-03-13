import { AuthProvider, UserData, WebWidgetAuthParams } from "oreid-js";
import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import merge from "lodash/merge";

export const useActionAuth = () => {
	const { webWidget, setUser } = useContext(OreIdContext);

	const onAuth = ({
		params,
		onSuccess,
		onError,
	}: {
		params?: WebWidgetAuthParams;
		onError?: OnError;
		onSuccess?: (user: UserData) => void;
	}) => {
		const defaultParams = merge({ provider: AuthProvider.Google }, params);

		const errorAction: OnError = (error) => {
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

		webWidget.onAuth({
			params: defaultParams,
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onAuth;
};
