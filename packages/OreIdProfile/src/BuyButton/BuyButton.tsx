import { startCase } from "lodash";
import { ChainNetwork, OreId } from "oreid-js";
import React, { useContext } from "react";
import { ButtonOutline } from "../ButtonOutline";
import { ProfileContext } from "../ProfileContext";
import { getAvaliableChainNetworks } from "../utils";
import styles from "./BuyButton.module.scss";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

interface Props {
	oreId: OreId;
}

export const BuyButton: React.FC<Props> = ({ oreId }) => {
	const avaliableChainNetworks = getAvaliableChainNetworks({ oreId });
	const hasDropdown = avaliableChainNetworks.length > 1;
	const { textColor } = useContext(ProfileContext);

	const buyAction = (chainNetwork: ChainNetwork) => {
		oreId.popup.buy({
			chainAccount: oreId.auth.accountName,
			chainNetwork: chainNetwork,
		});
	};

	return (
		<div className={styles.buyButton}>
			<ButtonOutline
				fontColor={textColor}
				onClick={() => {
					if (!hasDropdown) {
						buyAction(avaliableChainNetworks[0]);
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
					{avaliableChainNetworks.map((chainNetwork) => (
						<span key={chainNetwork} onClick={() => buyAction(chainNetwork)}>
							{startCase(chainNetwork)}
						</span>
					))}
				</div>
			)}
		</div>
	);
};
