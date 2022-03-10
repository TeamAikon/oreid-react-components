import { OnError } from "oreid-webwidget";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useActionLogout = () => {
	const { webWidget, setUser } = useContext(OreIdContext);

	const onLogout = ({
		onSuccess,
		onError,
	}: {
		onError?: OnError;
		onSuccess?: () => void;
	}) => {
		const errorAction: OnError = (error) => {
			if (!onError) {
				console.error(error);
				return;
			}
			onError(error);
		};

		const successAction = () => {
			setUser(undefined);
			if (onSuccess) {
				onSuccess();
			}
		};

		webWidget.onLogout({
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onLogout;
};
