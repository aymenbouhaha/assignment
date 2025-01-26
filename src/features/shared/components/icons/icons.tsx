import { HTMLAttributes } from "react";
import UserGraphic from "src/assets/icons/user-graphic.svg?react";
import Profile from "src/assets/icons/user.svg?react";
import Close from "src/assets/icons/close.svg?react";
import Dot from "src/assets/icons/dot.svg?react";
import Search from "src/assets/icons/search.svg?react";
import Balance from "src/assets/icons/balance.svg?react";

type IconType = HTMLAttributes<SVGElement>;

/**
 * `Icon` is a utility object that provides React components for rendering SVG icons.
 * Each property is a function that returns the corresponding SVG React component.
 *
 * @example
 * ```tsx
 * <Icon.UserGraphic className="w-6 h-6 text-gray-500" />
 * <Icon.Search />
 * ```
 */
export const Icon = {
	UserGraphic: (props?: IconType) => <UserGraphic {...props} />,
	Profile: (props?: IconType) => <Profile {...props} />,
	Close: (props?: IconType) => <Close {...props} />,
	Dot: (props?: IconType) => <Dot {...props} />,
	Search: (props?: IconType) => <Search {...props} />,
	Balance: (props?: IconType) => <Balance {...props} />,
};

/**
 * `CustomIcon` is a TypeScript type representing the keys of the `Icon` object.
 * It allows you to reference any available icon as a string.
 *
 * @typedef {keyof typeof Icon} CustomIcon
 *
 * @example
 * ```tsx
 * const selectedIcon: CustomIcon = "Search";
 * const IconComponent = Icon[selectedIcon];
 * return <IconComponent className="text-primary" />;
 * ```
 */
export type CustomIcon = keyof typeof Icon;
