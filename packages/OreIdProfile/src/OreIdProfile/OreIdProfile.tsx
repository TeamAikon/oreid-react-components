import { OreId } from "oreid-js";
import React, { useEffect } from "react";
// import { ButtonOutline } from "../ButtonOutline";
import { Icon } from "../Icon";
import { LongText } from "../LongText";
import { FloatBox } from "../FloatBox";

import styles from "./OreIdProfile.module.scss";
import { Style } from "../types";

interface Props {
	oreId: OreId;
	onClose: () => void;
	open: boolean;
	style?: Style;
	anchor?: JSX.Element;
	align?: "left" | "right";
}

export const OreIdProfile: React.FC<Props> = ({
	oreId,
	onClose,
	open,
	style,
	anchor,
	align,
}) => {
	const data = oreId.auth.user.data;
	const textColor = style?.textColor || "#222222";
	const linkColor = style?.linkColor || "#08B6E7";
	const backgroundColor = style?.backgroundColor || "#fff";

	useEffect(() => {
		if (oreId.auth.isLoggedIn) {
			oreId.auth.user.getData();
		}
	}, []);
	if (!oreId.auth.isLoggedIn || !data) return null;
	return (
		<FloatBox
			anchor={anchor || <span></span>}
			onClose={onClose}
			open={open}
			width={240}
			align={align}
			background={backgroundColor}
		>
			<div className={styles.OreIdProfile}>
				<span>
					<Icon
						size={72}
						//@ts-ignore
						icon={data.picture}
					/>
				</span>

				<span className={styles.name} style={{ color: textColor }}>
					{data.name}
					{data.email && (
						<>
							<br />
							{data.email}
						</>
					)}
				</span>

				<span className={styles.account} style={{ color: linkColor }}>
					<LongText text={data.accountName} truncateInMiddle showCopy />
				</span>

				{/* <span className={styles.manage}
					<ButtonOutline
						onClick={() => {
							console.log("Click");
						}}
						label="Manage your account"
						fontColor={linkColor}
					/>
				</span> */}

				<span className={styles.logout}>
					<button
						onClick={() => {
							oreId.auth.logout();
							onClose();
						}}
						style={{ color: textColor }}
					>
						<div>Log Out</div>
					</button>
				</span>
			</div>
		</FloatBox>
	);
};