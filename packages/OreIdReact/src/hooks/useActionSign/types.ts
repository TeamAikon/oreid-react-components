import {
	ChainNetwork,
	CreateTransactionData as CreateTransactionDataType,
	TransactionSignOptions,
} from "oreid-js";

export interface CreateTransactionData
	extends Omit<CreateTransactionDataType, "signOptions"> {
	chainAccount: string;
	chainNetwork: ChainNetwork;
}
export interface CreateTransaction {
	transactionData: CreateTransactionData;
	signOptions?: TransactionSignOptions;
}
