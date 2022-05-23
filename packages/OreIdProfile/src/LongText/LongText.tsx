import React, { FunctionComponent } from "react";
import { Link } from "@material-ui/core";
import classNames from "classnames";
import { CopyToClipboard } from "../CopyToClipboard";
import TruncateMiddle from "./TruncateMiddle";

import "./LongText.scss";

interface LongTextProps {
	text: string;
	className?: string;
	href?: string;
	truncateInMiddle?: boolean;
	showCopy?: boolean;
	onCopy?: () => void;
	onClick?: () => void;
}

export const LongText: FunctionComponent<LongTextProps> = (props) => {
	const { className, href, text, truncateInMiddle, showCopy, onCopy, onClick } =
		props;
	return (
		<div className="oreId-profile-longText">
			<Link
				component={href ? "a" : "div"}
				underline={href ? "hover" : "none"}
				href={href || undefined}
				rel="noreferrer"
				target="_blank"
				variant="body1"
				className={classNames(className, {
					"oreId-profile-longText-link": true,
					"oreId-profile-longText-pointerCursor": !!href,
				})}
				onClick={onClick}
			>
				{truncateInMiddle ? (
					<TruncateMiddle>
						<span>{text}</span>
					</TruncateMiddle>
				) : (
					text
				)}
			</Link>
			{showCopy && (
				<div
					className="oreId-profile-longText-copy"
					onClick={(e) => e.stopPropagation()}
				>
					<CopyToClipboard text={text} onCopy={onCopy} />
				</div>
			)}
		</div>
	);
};
