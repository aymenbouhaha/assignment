import { Icon } from "@shared/components/icons/icons.tsx";

export const RepositoryItem = () => {
	return (
		<div className="border border-grey-border rounded-md py-2.5 px-3 flex justify-between">
			<div className="flex flex-col gap-2">
				<div className="flex-flex-col gap-1">
					<div className="flex gap-2 items-center">
						<div className="text-p1 text-primary-purple">battery-rul-estimation</div>
						<div className="px-1 py-[2px] border border-grey-border text-grey-1 text-p4 rounded">Public</div>
					</div>
					<div className="text-primary-purple text-p4">Forked from MichealBosello / battery-rul-estimation</div>
				</div>
				<div className="text-p3 text-primary-black">
					Remaining Useful Life (RUL) estimation of Lithium-ion batteries using deep LSTMs
				</div>
				<div className="flex gap-3">
					<div className="flex gap-1.5 items-center">
						<Icon.Dot />
						<div className="text-p3 text-primary-orange">Jupyter Notebook</div>
					</div>
				</div>
			</div>
		</div>
	);
};
