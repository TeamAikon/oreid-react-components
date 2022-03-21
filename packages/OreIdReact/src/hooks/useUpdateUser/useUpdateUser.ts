import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import isEqual from "lodash/isEqual";

export const useUpdateUser = () => {
	const { oreId, setUser, user } = useContext(OreIdContext);
	const updateUser = () => {
		if (!oreId.accessToken) {
			if (user) {
				setUser(undefined);
			}
			return;
		}
		oreId.auth.user.getData().then(() => {
			const update = oreId.auth.user.data;
			if (!isEqual(user, update)) {
				setUser(update);
			}
		});
	};
	return updateUser;
};
