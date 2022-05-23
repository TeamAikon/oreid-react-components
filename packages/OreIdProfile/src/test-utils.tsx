import { OreId } from "oreid-js";

export const createTestOreId = () => {
	return {
		createTransaction: jest.fn(),
		auth: {
			user: {
				hasData: jest.fn(),
				getData: jest.fn(),
				subscribe: jest.fn(),
				unsubscribe: jest.fn(),
			},
			subscribe: jest.fn(),
			unsubscribe: jest.fn(),
		},
		popup: {
			auth: jest.fn(),
			logout: jest.fn(),
			newChainAccount: jest.fn(),
			sign: jest.fn(),
		},
	} as unknown as OreId;
};

export * from "@testing-library/react-hooks";
