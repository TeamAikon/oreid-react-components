import { OreId } from "oreid-js";
import React, { useEffect } from "react";
import { ButtonOutline } from "../ButtonOutline";
import { Icon } from "../Icon";
import { LongText } from "../LongText";
import { FloatBox } from "../FloatBox";

import "./OreIdProfile.scss";

interface Props {
	oreId: OreId;
	onClose: () => void;
	open: boolean;
}

export const OreIdProfile: React.FC<Props> = ({ oreId, onClose, open }) => {
	const data = oreId.auth.user.data;
	useEffect(() => {
		if (oreId.auth.isLoggedIn) {
			oreId.auth.user.getData();
		}
	}, []);
	if (!oreId.auth.isLoggedIn || !data) return null;
	if (!open) return null;
	return (
		<FloatBox onClose={onClose} width={360}>
			<div className="oreId-profile-profile">
				<span>
					<Icon
						size={72}
						//@ts-ignore
						icon={data.picture}
					/>
				</span>

				<span className="oreId-profile-profile-name">{data.name}</span>

				<span className="oreId-profile-profile-account">
					<LongText text={data.accountName} truncateInMiddle showCopy />
				</span>

				{/* <span className="oreId-profile-profile-manage">
					<ButtonOutline
						onClick={() => {
							console.log("Click");
						}}
						label="Manage your account"
						fontColor="#05B6E7"
					/>
				</span> */}

				<span className="oreId-profile-profile-logout">
					<button
						onClick={() => {
							oreId.auth.logout();
							onClose();
						}}
					>
						<div>Log Out</div>
					</button>
				</span>
			</div>
		</FloatBox>
	);
};
