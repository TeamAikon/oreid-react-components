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

function onlyUnique(value: any, index: number, self: string | any[]) {
  return self.indexOf(value) === index;
}

export const BuyButton: React.FC<Props> = ({ oreId }) => {
	let chainAccounts = oreId?.auth?.user?.data?.chainAccounts || [];
	chainAccounts = chainAccounts?.filter(ca => !ca.chainNetwork.startsWith('ore')) // filter out ORE networks - we dont sell anything on ORE
	const chainNetworks = chainAccounts?.map(ca => ca.chainNetwork).filter(onlyUnique) // unique set of chain networks in use
	const hasDropdown = chainAccounts.length > 1;
	const { textColor } = useContext(ProfileContext);

	return (
		<div className={styles.buyButton}>
			<ButtonOutline
				fontColor={textColor}
				onClick={() => {
					if (!hasDropdown) {
						oreId.popup.buy({
							chainAccount: chainAccounts[0].chainAccount,
							chainNetwork: chainAccounts[0].chainNetwork,
							limitToChains: chainNetworks,
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
									limitToChains: chainNetworks
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
