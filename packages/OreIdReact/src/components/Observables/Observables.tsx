import isEqual from "lodash/isEqual";
import { Auth, User } from "oreid-js";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { OreIdContext } from "src/OreIdContext";

interface Props {}
export const Observables: React.FC<Props> = () => {
	const {
		oreId,
		setUser,
		setAccessToken,
		setIsLoggedIn,
		user,
		isLoggedIn,
		accessToken,
	} = useContext(OreIdContext);
	const [authUser, setAuthUser] = useState<User | undefined>(oreId.auth.user);

	const updateUserState = useCallback((newUser: User) => {
		try {
			if (!isEqual(newUser?.data, user)) {
				setUser(newUser?.data);
			}
		} catch (err) {
			setUser(undefined);
		}
	}, []);

	const updateOreIdState = useCallback(
		(auth: Auth) => {
			if (authUser != auth?.user) {
				setAuthUser(auth?.user);
			}
			if (auth.isLoggedIn !== isLoggedIn) {
				setIsLoggedIn(auth.isLoggedIn);
			}
			if (accessToken !== auth.accessToken) {
				setAccessToken(auth.accessToken);
			}
		},
		[setAuthUser, setIsLoggedIn, setAccessToken]
	);

	useEffect(() => {
		oreId.auth.subscribe(updateOreIdState);
		return () => {
			oreId.auth.unsubscribe(updateOreIdState);
		};
	}, [oreId]);

	useEffect(() => {
		authUser?.subscribe(updateUserState);
		authUser?.getData();
		return () => {
			authUser?.unsubscribe(updateUserState);
		};
	}, [authUser]);

	return null;
};
