import { createContext } from "react";

export const ProfileContext = createContext<{
	textColor: string;
	linkColor: string;
	backgroundColor: string;
}>({
	textColor: "#222222",
	linkColor: "#08B6E7",
	backgroundColor: "#fff",
});
