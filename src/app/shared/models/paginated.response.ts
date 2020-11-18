export interface PaginatedResponse<M> {

    page: number;
    results: Array<M>;
    totalPages: number;
    totalResults: number;

}
