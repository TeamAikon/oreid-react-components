import { Auth, OreId, UserData } from "oreid-js";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { OreIdProfile } from "../OreIdProfile";

import styles from "./OreIdProfileButton.module.scss";
import classNames from "classnames";

interface Props {
	oreId: OreId;
	style?: Style;
	align?: "left" | "right";
}

export const OreIdProfileButton: React.FC<Props> = ({
	oreId,
	style,
	align,
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(oreId.auth.isLoggedIn);
	const [userData, setUserData] = useState<UserData | undefined>();
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
		if (oreId.auth.isLoggedIn && !userData) updateState(oreId.auth);
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
				{userData && (
					<OreIdProfile
						anchor={
							<Button onClick={() => setShowModal(true)}>
								<div
									className={classNames(styles.OreIdProfileButton, {
										[styles.showModal]: showModal,
									})}
									style={{ color: style?.textColor || "#222222" }}
								>
									<Icon icon={userData.picture.href} size={32} />{" "}
									{userData.name}
								</div>
							</Button>
						}
						style={style}
						open={showModal}
						onClose={() => setShowModal(false)}
						oreId={oreId}
						align={align}
					/>
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
