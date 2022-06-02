import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./FloatBox.module.scss";

interface Props {
	anchor: JSX.Element;
	onClose: () => void;
	open: boolean;

	width: number;
	background?: string;
	align?: "left" | "right";
}

export const FloatBox: React.FC<Props> = ({
	anchor,
	onClose,
	open,

	children,
	width,
	background,
	align,
}) => {
	const wrapperRef = useRef<any>(null);
	const [height, setHeight] = useState(0);

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

	useEffect(() => {
		setHeight(wrapperRef.current?.clientHeight || 0);
	});

	return (
		<div className={styles.FloatBoxAnchor}>
			{anchor}
			{open && (
				<div
					ref={wrapperRef}
					className={classNames(styles.FloatBox, {
						[styles.right]: align === "right",
					})}
					style={{
						width,
						background: background || "#fff",
						bottom: (height + 10) * -1,
					}}
				>
					<div className={styles.content}>{children}</div>
				</div>
			)}
		</div>
	);
};
