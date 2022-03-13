import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useIsLoggedIn = () => {
	const { oreId } = useContext(OreIdContext);
	return oreId?.auth?.isLoggedIn;
};
