import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names and merge Tailwind classes.
 *
 * @param {...ClassValue[]} inputs - The class names to combine.
 * @returns {string} - A single merged string of class names.
 *
 * @example
 * // Example 1: Combining static and conditional classes
 * cn("btn", isActive && "btn-active", "btn-primary");
 * // Output: "btn btn-primary btn-active" (if `isActive` is true)
 *
 * @example
 * // Example 2: Automatically merging conflicting Tailwind classes
 * cn("text-sm", "text-lg");
 * // Output: "text-lg" (tailwind-merge resolves the conflict)
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
