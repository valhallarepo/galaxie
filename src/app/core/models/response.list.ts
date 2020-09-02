import { IResponse } from './iresponse';

export abstract class ResponseList<T extends IResponse> implements IResponse {

  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;

}
