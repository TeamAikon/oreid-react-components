import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";

export const useWebWidget = () => {
	const { webWidget } = useContext(OreIdContext);
	return webWidget;
};
