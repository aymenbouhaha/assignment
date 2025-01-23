import { PaginationModel } from "@shared/models/pagination.model.ts";

export interface SearchQueryResultModel<T> {
	search: {
		nodes: (T & { __typename: string })[];
		pageInfo: PaginationModel;
	};
}
