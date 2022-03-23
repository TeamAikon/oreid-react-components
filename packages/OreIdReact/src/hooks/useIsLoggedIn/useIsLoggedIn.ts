import { useContext, useEffect } from "react";
import { OreIdContext } from "src/OreIdContext";
import { useUpdateUser } from "../useUpdateUser";

export const useIsLoggedIn = () => {
	const updateUser = useUpdateUser();
	useEffect(() => updateUser(), []);

	const { oreId } = useContext(OreIdContext);
	return !!oreId?.auth?.isLoggedIn;
};
