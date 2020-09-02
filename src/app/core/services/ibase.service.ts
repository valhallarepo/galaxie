import { Observable } from 'rxjs/internal/Observable';

export interface IBaseService<S, T> {

    delete(id: number | string): Observable<T>;
    get(id?: number | string, data?: S): Observable<T>;
    patch(id: number | string, data: S): Observable<T>;
    put(id: number | string, data: S): Observable<T>;

}
