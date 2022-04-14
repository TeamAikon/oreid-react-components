// @ts-nocheck

import { Auth, User } from "oreid-js";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OreIdContext } from "src/OreIdContext";

interface Props {}
export const Observables: React.FC<Props> = () => {
	const { oreId, setUser, setAccessToken, setIsLoggedIn } =
		useContext(OreIdContext);
	const [authUser, setAuthUser] = useState<User | undefined>(oreId.auth.user);

	const updateUserState = useCallback(
		(newUser: User) => {
			try {
				setUser(newUser?.data);
			} catch (err) {
				setUser(undefined);
			}
		},
		[setUser]
	);

	const updateOreIdState = useCallback(
		(auth: Auth) => {
			setAuthUser(auth?.user);
			setIsLoggedIn(auth.isLoggedIn);
			setAccessToken(auth.accessToken);
		},
		[setAuthUser, setIsLoggedIn, setAccessToken]
	);

	useEffect(() => {
		oreId.auth.subscribe(updateOreIdState);
		return () => {
			oreId.auth.unsubscribe(updateOreIdState);
		};
	}, [oreId, updateOreIdState]);

	useEffect(() => {
		if (!authUser) return;
		authUser.subscribe(updateUserState);
		authUser.getData().catch(() => {
			// ! If it fails, nothing needs to be done.
			// ! This function should stay here to prevent the error alert from appearing in the console
		});
		return () => {
			authUser.unsubscribe(updateUserState);
		};
	}, [authUser]);

	return null;
};
