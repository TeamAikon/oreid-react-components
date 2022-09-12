import { ChainNetwork, OreId } from "oreid-js";
import uniq from "lodash/uniq";

export const getAvaliableChainNetworks = ({
	oreId,
}: {
	oreId?: OreId;
}): ChainNetwork[] => {
	const chainNetworks = oreId?.auth?.user?.data?.chainAccounts.map(
		(chainAccount) => chainAccount.chainNetwork
	);
	return uniq(chainNetworks || []);
};
