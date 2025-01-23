import { useEffect, useRef, useState } from "react";

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
