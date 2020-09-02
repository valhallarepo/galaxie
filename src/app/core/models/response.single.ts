import { IResponse } from "./iresponse";

export abstract class ResponseSingle<T extends IResponse> implements IResponse {

    result?: T;

}
