import React, { FunctionComponent, useState } from "react";
import {
	CopyToClipboard as CopyToClipboardComponent,
	Props as CopyToClipboardComponentProps,
} from "react-copy-to-clipboard";
import classNames from "classnames";
import { Tooltip } from "@material-ui/core";

import styles from "./CopyToClipboard.module.scss";

interface Props extends CopyToClipboardComponentProps {
	className?: string;
	onCopy?: () => void;
}

export const CopyToClipboard: FunctionComponent<Props> = (props) => {
	const { children, className, onCopy, ...other } = props;
	const [copied, setCopied] = useState(false);
	return (
		<CopyToClipboardComponent
			{...other}
			onCopy={() => {
				setCopied(true);
				if (onCopy) onCopy();
			}}
		>
			<Tooltip open={copied} title="Copied!" placement="top">
				<div
					onAnimationEnd={() => setCopied(false)}
					className={classNames(className, {
						[styles.CopyToClipboard]: true,
						[styles.CopyToClipboardCopied]: copied,
					})}
				>
					{children}
				</div>
			</Tooltip>
		</CopyToClipboardComponent>
	);
};
