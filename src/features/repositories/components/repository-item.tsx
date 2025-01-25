import { PrimaryLanguage } from "./primary-language.tsx";
import { License } from "@/features/repositories/components/license.tsx";
import { RepositoryModel } from "@/features/repositories/models/repository.model.ts";

export const RepositoryItem = ({ repository }: { repository: RepositoryModel }) => {
	return (
		<div className="border border-grey-border rounded-md py-2.5 px-3 flex justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex-flex-col gap-1">
					<div className="flex gap-2 items-center">
						<a className="text-p1 text-primary-purple hover:underline hover:underline-offset-3" href={repository.url}>
							{repository.name}
						</a>
						<div className="px-1 py-[2px] border border-grey-border text-grey-1 text-p4 rounded">
							{repository.isPrivate ? "Private" : "Public"}
						</div>
					</div>
					{repository.parent && (
						<div className="text-grey-1 text-p4">
							Forked from{" "}
							<a href={repository.parent.url} className={"underline underline-offset-3"}>
								{repository.parent.nameWithOwner}
							</a>
						</div>
					)}
				</div>
				<div className="text-p3 text-primary-black">{repository.description}</div>
				<div className="flex gap-3">
					{repository.primaryLanguage && (
						<PrimaryLanguage name={repository.primaryLanguage.name} color={repository.primaryLanguage.color} />
					)}
					{repository.licenseInfo && <License name={repository.licenseInfo.name} />}
				</div>
			</div>
		</div>
	);
};
