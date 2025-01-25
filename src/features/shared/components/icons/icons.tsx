import { HTMLAttributes } from "react";
import UserGraphic from "src/assets/icons/user-graphic.svg?react";
import Profile from "src/assets/icons/user.svg?react";
import Close from "src/assets/icons/close.svg?react";
import Dot from "src/assets/icons/dot.svg?react";
import Search from "src/assets/icons/search.svg?react";
import Balance from "src/assets/icons/balance.svg?react";

type IconType = HTMLAttributes<SVGElement>;

export const Icon = {
	UserGraphic: (props?: IconType) => <UserGraphic {...props} />,
	Profile: (props?: IconType) => <Profile {...props} />,
	Close: (props?: IconType) => <Close {...props} />,
	Dot: (props?: IconType) => <Dot {...props} />,
	Search: (props?: IconType) => <Search {...props} />,
	Balance: (props?: IconType) => <Balance {...props} />,
};

export type CustomIcon = keyof typeof Icon;
