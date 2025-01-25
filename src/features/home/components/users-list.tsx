import { UserModel } from "@home/models/user.model.ts";
import { SearchResultItem } from "@shared/components/others/search-result.tsx";
import { ThreeDotsLoader } from "@shared/components/loaders/three-dots-loader.tsx";
import { IntersectionObserverHookRefCallback } from "react-intersection-observer-hook";
import { PaginationModel } from "@shared/models/pagination.model.ts";
import { Loader } from "@shared/components/loaders/loader.tsx";

export const UsersList = ({
	users,
	infiniteRef,
	cursor,
	onItemClick,
	loading,
}: {
	users: UserModel[];
	infiniteRef?: IntersectionObserverHookRefCallback;
	cursor?: PaginationModel;
	onItemClick?: (user: UserModel) => void;
	loading?: boolean;
}) => {
	return loading ? (
		<div className={"w-full h-[100px] flex justify-center items-center"}>
			<Loader />
		</div>
	) : users.length ? (
		<>
			{users.map((item) => (
				<SearchResultItem
					key={`user.${item.id}`}
					onClick={() => {
						if (onItemClick) {
							onItemClick(item);
						}
					}}
					image={item.avatarUrl}
					text={item.login}
				/>
			))}
			{infiniteRef && cursor?.hasNextPage && (
				<div ref={infiniteRef}>
					<ThreeDotsLoader wrapperClass="flex justify-center" />
				</div>
			)}
		</>
	) : (
		<div className="w-full h-[100px] flex justify-center items-center text-primary-black text-p2">No items found</div>
	);
};
