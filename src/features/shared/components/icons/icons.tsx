import { HTMLAttributes } from "react";
import UserGraphic from "src/assets/icons/user-graphic.svg?react";
import Profile from "src/assets/icons/user.svg?react";
import Close from "src/assets/icons/close.svg?react";

type IconType = HTMLAttributes<SVGElement>;

export const Icon = {
	UserGraphic: (props?: IconType) => <UserGraphic {...props} />,
	Profile: (props?: IconType) => <Profile {...props} />,
	Close: (props?: IconType) => <Close {...props} />,
};

export type CustomIcon = keyof typeof Icon;
