import { z } from "zod";

export const GithubLoginFormSchema = z.object({
	login: z.string({ required_error: "Please enter a login" }),
});

export type GithubLoginForm = z.infer<typeof GithubLoginFormSchema>;
