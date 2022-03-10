import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useIsAuth = () => {
	const { user, oreId } = useContext(OreIdContext);
	return !!user || !!oreId.auth.accessToken;
};
