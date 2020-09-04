export interface BaseResponse<M> {

    page: number;
    results: Array<M>;
    total_pages: number;
    total_results: number;

}