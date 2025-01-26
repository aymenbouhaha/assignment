import { Icon } from "@shared/components/icons/icons.tsx";
import React from "react";

/**
 * The `License` component is a simple, reusable component designed to display a license name alongside a balance icon.
 *
 * @component
 * @example
 * ```tsx
 * <License name="Creative Commons" />
 * ```
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the license to be displayed.
 *
 * @returns {React.JSX} The rendered `License` component.
 */
export const License = ({ name }: { name: string }): React.JSX.Element => {
	return (
		<div className="flex gap-1.5 items-center">
			<Icon.Balance className={"size-6 lg:size-5"} />
			<div className="text-p3 text-primary-green lg:text-p4">{name}</div>
		</div>
	);
};
