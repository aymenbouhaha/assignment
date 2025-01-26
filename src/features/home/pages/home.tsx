import { WelcomeCard } from "@home/components/welcome-card.tsx";
import React from "react";

/**
 * The `Home` component serves as the main entry point for the application.
 * It renders the `WelcomeCard` component, centering it within the viewport.
 *
 * @component
 * @returns {React.JSX} The rendered `Home` component.
 *
 * @example
 * <Home />
 */
export const Home = (): React.JSX.Element => {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<WelcomeCard />
		</div>
	);
};
