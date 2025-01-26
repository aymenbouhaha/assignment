import { LanguageModel } from "@repositories/models/language.model.ts";

export interface RepositoryModel {
	id: string;
	name: string;
	description: string | null;
	parent: { nameWithOwner: string; url: string } | null;
	url: string;
	primaryLanguage: LanguageModel | null;
	licenseInfo: { name: string } | null;
	isPrivate: boolean;
}
