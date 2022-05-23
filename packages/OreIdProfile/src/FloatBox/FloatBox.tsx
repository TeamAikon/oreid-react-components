import { Paper } from "@material-ui/core";

import React, { useEffect, useRef } from "react";

import "./FloatBox.scss";

interface Props {
	onClose: () => void;
	width: number;
	background?: string;
}

export const FloatBox: React.FC<Props> = ({
	children,
	width,
	onClose,
	background,
}) => {
	const wrapperRef = useRef<any>(null);
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				onClose();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef, onClose]);

	return (
		<div className="oreId-profile-anchor">
			<div
				ref={wrapperRef}
				className="oreId-profile-FloatBox"
				style={{ width }}
			>
				<Paper elevation={8} style={{ background: background }}>
					<div className="oreId-profile-FloatBox-content">{children}</div>
				</Paper>
			</div>
		</div>
	);
};
