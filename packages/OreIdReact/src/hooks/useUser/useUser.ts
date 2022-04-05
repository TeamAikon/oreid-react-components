import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useUser = () => {
	const { user } = useContext(OreIdContext);
	return user;
};
