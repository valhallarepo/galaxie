import { Observable } from 'rxjs/internal/Observable';

export interface IBaseService<S, T> {

    get(data: S): Observable<T>;
    all(data?: S): Observable<T>;
    save(data: S): Observable<T>;
    patch(id: number | string, data: S): Observable<T>;
    remove(data: number | string): Observable<T>;

}
