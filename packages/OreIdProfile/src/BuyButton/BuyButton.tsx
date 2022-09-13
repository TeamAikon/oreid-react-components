import { startCase } from "lodash";
import { OreId } from "oreid-js";
import React, { useContext } from "react";
import { ButtonOutline } from "../ButtonOutline";
import { ProfileContext } from "../ProfileContext";

import styles from "./BuyButton.module.scss";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { LongText } from "../LongText";

interface Props {
	oreId: OreId;
}

export const BuyButton: React.FC<Props> = ({ oreId }) => {
	const chainAccounts = oreId?.auth?.user?.data?.chainAccounts || [];
	const hasDropdown = chainAccounts.length > 1;
	const { textColor } = useContext(ProfileContext);

	return (
		<div className={styles.buyButton}>
			<ButtonOutline
				fontColor={textColor}
				onClick={() => {
					if (chainAccounts.length === 1) {
						oreId.popup.buy({
							chainAccount: chainAccounts[0].chainAccount,
							chainNetwork: chainAccounts[0].chainNetwork,
						});
					}
				}}
			>
				<div className={styles.label}>
					<span>Buy Tokens</span>
					{hasDropdown && (
						<span>
							<ArrowDropDown />
						</span>
					)}
				</div>
			</ButtonOutline>
			{hasDropdown && (
				<div className={styles.dropdown}>
					{oreId.auth.user.data.chainAccounts?.map((userChainAccount) => (
						<div
							className={styles.dropdownItem}
							key={`${userChainAccount.chainNetwork}:${userChainAccount.chainAccount}`}
							onClick={() =>
								oreId.popup.buy({
									chainAccount: userChainAccount.chainAccount,
									chainNetwork: userChainAccount.chainNetwork,
								})
							}
						>
							<LongText text={userChainAccount.chainAccount} truncateInMiddle />
							{`(${startCase(userChainAccount.chainNetwork)})`}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
