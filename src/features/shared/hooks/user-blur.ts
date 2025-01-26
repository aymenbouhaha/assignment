import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect whether a user clicks inside or outside of a specified element.
 *
 * @returns {Array} - An array containing:
 *   - `ref` (`React.RefObject<HTMLElement>`): A ref to attach to the target element.
 *   - `isInside` (`boolean`): A boolean state indicating whether the last click occurred inside the target element.
 *
 * @example
 * const { ref, isInside } = useBlur();
 *
 * <div ref={ref}>
 *   {isInside ? "Clicked inside" : "Clicked outside"}
 * </div>
 */
export const useBlur = () => {
	const ref = useRef(null);
	const [isInside, setIsInside] = useState(false);
	const handleMouseDown = (e: MouseEvent) => {
		if (ref.current && (ref.current as HTMLElement).contains(e.target as Node)) {
			setIsInside(true);
		} else {
			setIsInside(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleMouseDown);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	return {
		ref,
		isInside,
	};
};
