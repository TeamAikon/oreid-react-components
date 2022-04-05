import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useIsLoggedIn = () => {
	const { isLoggedIn } = useContext(OreIdContext);
	return isLoggedIn;
};
