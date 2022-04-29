import { PopUpError } from "oreid-js";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useActionLogout = () => {
	const { oreId, setUser } = useContext(OreIdContext);

	const onLogout = (input?: {
		onError?: PopUpError;
		onSuccess?: () => void;
	}) => {
		const { onSuccess = undefined, onError = undefined } = input || {};
		const errorAction: PopUpError = (error) => {
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

		oreId.popup?.logout({
			onError: errorAction,
			onSuccess: successAction,
		});
	};

	return onLogout;
};
