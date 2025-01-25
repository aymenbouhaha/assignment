import { useForm } from "react-hook-form";

import { GithubLoginForm, GithubLoginFormSchema } from "@home/models/github-login-form.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { WelcomeCard } from "@home/components/welcome-card.tsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const form = useForm<GithubLoginForm>({
		resolver: zodResolver(GithubLoginFormSchema),
	});
	const navigate = useNavigate();

	const onSubmit = (data: GithubLoginForm) => {
		navigate(`/repositories/${data.login}`);
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<WelcomeCard form={form} onSubmit={onSubmit} />
		</div>
	);
};
