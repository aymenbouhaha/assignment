export interface PaginationModel {
	endCursor: string | null;
	startCursor: string | null;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export const paginationDefaultValues = {
	startCursor: null,
	hasNextPage: false,
	endCursor: null,
	hasPreviousPage: false,
};
