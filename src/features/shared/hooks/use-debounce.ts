import { useEffect, useState } from "react";

/**
 * Custom hook for debouncing a value.
 * It ensures that the value is updated only after the specified delay has passed
 * since the last change, avoiding frequent updates.
 *
 * @template T - The type of the value being debounced.
 * @param {T} value - The value to debounce.
 * @param {number} [delay=500] - The debounce delay in milliseconds (default is 500ms).
 * @returns {T} - The debounced value.
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     fetchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay ?? 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
