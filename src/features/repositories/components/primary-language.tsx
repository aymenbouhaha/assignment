import { Icon } from "@shared/components/icons/icons.tsx";
import React from "react";

type PrimaryLanguageProps = { name: string; color: string };

/**
 * The `PrimaryLanguage` component is a reusable UI element designed to display a programming language or primary language name alongside a colored dot icon.
 *
 * @component
 * @example
 * ```tsx
 * <PrimaryLanguage name="JavaScript" color="#F7DF1E" />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the language to be displayed (e.g., "JavaScript", "Python").
 * @param {string} props.color - A color string (e.g., hex or RGB) used for the dot icon and text.
 *
 * @returns {React.JSX} The rendered `PrimaryLanguage` component.
 */
export const PrimaryLanguage = ({ name, color }: PrimaryLanguageProps): React.JSX.Element => {
	return (
		<div className="flex gap-1.5 items-center">
			<Icon.Dot
				className={"size-3.5 lg:size-2.5"}
				style={{
					fill: color,
				}}
			/>
			<div
				className="text-p3 lg:text-p4"
				style={{
					color: color,
				}}
			>
				{name}
			</div>
		</div>
	);
};
