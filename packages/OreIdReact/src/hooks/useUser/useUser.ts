import { useEffect } from "react";
import { useContext } from "react";
import { OreIdContext } from "src/OreIdContext";
import { useUpdateUser } from "../useUpdateUser";

export const useUser = () => {
	const updateUser = useUpdateUser();
	useEffect(() => updateUser(), []);

	const { user } = useContext(OreIdContext);
	return user;
};
