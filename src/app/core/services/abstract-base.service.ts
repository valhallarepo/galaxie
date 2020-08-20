import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

export interface IBaseService<T> {
  get(data: T): Observable<T>;
  all(data?: T): Observable<Array<T>>;
  save(data: T): Observable<T>;
  patch(id: number | string, data: T): Observable<T>;
  remove(data: number | string): Observable<T>;
}

export abstract class AbstractBaseService<T> implements IBaseService<T> {

  private baseResource: string;
  private baseHttp: HttpClient;

  constructor(resource: string, http: HttpClient) {
    this.baseResource = resource;
    this.baseHttp = http;
  }

  getResource(): string {
    return this.baseResource;
  }

  getHttp(): HttpClient {
    return this.baseHttp;
  }

  getServerURL(): string {
    return `${environment.API_SERVER}`;
  }

  getHttpHeaderOptionToken(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  abstract get(data: T): Observable<T>;
  abstract all(data?: T): Observable<Array<T>>;
  abstract save(data: T): Observable<T>;
  abstract patch(id: number | string, data: T): Observable<T>;
  abstract remove(id: number | string): Observable<T>;

}
