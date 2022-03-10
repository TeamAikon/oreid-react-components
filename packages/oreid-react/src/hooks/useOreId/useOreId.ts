import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useOreId = () => {
	const { oreId } = useContext(OreIdContext);
	return oreId;
};
