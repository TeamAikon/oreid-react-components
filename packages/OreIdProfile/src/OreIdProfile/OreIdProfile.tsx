import { startCase } from "lodash";
import { OreId } from "oreid-js";
import React, { useEffect } from "react";
import { ButtonOutline } from "../ButtonOutline";
import { FloatBox } from "../FloatBox";
import { Icon } from "../Icon";
import { LongText } from "../LongText";
import { ProfileProvider } from "../ProfileContext";
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
	if (oreId.isInitialized !== true) return null;
	return (
		<ProfileProvider
			textColor={textColor}
			linkColor={linkColor}
			backgroundColor={backgroundColor}
		>
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
						<ButtonOutline label="Buy Tokens" fontColor={textColor} />
						<div className={styles.dropdown}>
							{data.chainAccounts?.map((userChainAccount) => (
								<div
									onClick={() =>
										oreId.popup.buy({
											chainAccount: userChainAccount.chainAccount,
											chainNetwork: userChainAccount.chainNetwork,
										})
									}
								>
									<LongText
										text={userChainAccount.chainAccount}
										truncateInMiddle
									/>
									{`(${startCase(userChainAccount.chainNetwork)})`}
								</div>
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
		</ProfileProvider>
	);
};
