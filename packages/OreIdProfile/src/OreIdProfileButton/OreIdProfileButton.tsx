import { Auth, OreId, UserData } from "oreid-js";
import React, { useEffect, useState } from "react";
import { Style } from "../types";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { OreIdProfile } from "../OreIdProfile";

import "./OreIdProfileButton.scss";
import classNames from "classnames";

interface Props {
	oreId: OreId;
	style?: Style;
}

export const OreIdProfileButton: React.FC<Props> = ({ oreId, style }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(oreId.auth.isLoggedIn);
	const [userData, setUserData] = useState<UserData | undefined>(
		oreId.auth.isLoggedIn ? oreId.auth.user.data : undefined
	);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const updateState = (auth: Auth) => {
			setIsLoggedIn(auth.isLoggedIn);
			if (auth.isLoggedIn) {
				auth.user.getData().then((data) => setUserData(data));
			} else {
				setUserData(undefined);
			}
		};
		oreId.auth.subscribe(updateState);
		return () => {
			oreId.auth.unsubscribe(updateState);
		};
	}, []);

	useEffect(() => {
		setShowModal(false);
	}, [isLoggedIn]);

	if (isLoggedIn && userData) {
		return (
			<>
				<Button onClick={() => setShowModal(true)}>
					<div
						className={classNames("oreId-profile-OreIdProfileButton", {
							showModal,
						})}
						style={{ color: style?.textColor || "#222222" }}
					>
						<Icon icon={userData.picture as any} size={20} /> {userData.name}
					</div>
				</Button>
				{userData && (
					<>
						<br />
						<OreIdProfile
							open={showModal}
							onClose={() => setShowModal(false)}
							oreId={oreId}
						/>
					</>
				)}
			</>
		);
	}
	if (!isLoggedIn) {
		// Show login buttom
		return null;
	}
	return null;
};
