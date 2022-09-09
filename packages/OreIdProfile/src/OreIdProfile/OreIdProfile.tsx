import React, { useEffect } from "react";
import { ChainNetwork, OreId } from "oreid-js";
import { ButtonOutline } from "../ButtonOutline";
import { Icon } from "../Icon";
import { LongText } from "../LongText";
import { FloatBox } from "../FloatBox";
import { startCase } from "lodash";
import styles from "./OreIdProfile.module.scss";

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
					<Icon size={72} icon={data.picture} />
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
					<LongText text={oreId.auth.accountName} truncateInMiddle showCopy />
				</span>

				<div className={styles.buy}>
					<ButtonOutline
						label="Buy Tokens"
						fontColor={textColor}
					/>
					<div className={styles.dropdown}>
						{oreId.auth.user.data.chainAccounts.map(userChainAccount => (
							<span
								onClick={() => oreId.popup.buy({ chainAccount: userChainAccount.chainAccount, chainNetwork: userChainAccount.chainNetwork })}
							>
								{`${userChainAccount.chainAccount} (${userChainAccount.chainNetwork})`}
							</span>
						))}
					</div>
				</div>

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
