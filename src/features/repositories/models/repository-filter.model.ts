import { z } from "zod";

export const RepositoryFilterSchema = z.object({
	repository: z.string().optional(),
	language: z.string().optional(),
});

export type RepositoryFilterModel = z.infer<typeof RepositoryFilterSchema>;

export const repositoryFilterDefault = {
	language: "",
	repository: "",
};
