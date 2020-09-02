import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IRequest } from '../model/irequest';
import { IResponse } from '../model/iresponse';
import { IBaseService } from './ibase.service';

export class BaseService<S extends IRequest, T extends IResponse> implements IBaseService<S, T> {

  private _http: HttpClient;
  private _baseURL: string;
  private _resource: string;

  constructor(http: HttpClient, baseURL: string, resource: string) {
    this._http = http;
    this._baseURL = baseURL;
    this._resource = resource;
  }

  protected get http(): HttpClient {
    return this._http;
  }

  /**
   * Implementação do verbo DELETE
   * Exclusão de um registro com base no 'ID' do registro.
   * @param data 
   */
  delete(id: number | string): Observable<T> {
    return this._http.delete<T>(`${this._baseURL}/${this._resource}/${id}`);
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base nos fitros informados.
   * @param data 
   */
  private find(data?: S) {
    const options = { params: new HttpParams() };

    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          options.params = options.params.set(key, data[key]);
        }
      });
    }

    return this._http.get<T>(`${this._baseURL}/${this._resource}`, options as Object);
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base no 'ID' ou nos filtros informados.
   * @param data 
   * @param id 
   */
  get(id?: number | string, data?: S): Observable<T> {

    if (id) {
      return this._http.get<T>(`${this._baseURL}/${this._resource}/${id}`);
    }

    return this.find(data);
  }

  /**
   * Implementação do verbo POST.
   * Criação de um novo registro, o 'ID' NÃO deve ser submetido na requisição.
   * @param data 
   */
  post(data: S): Observable<T> {
    return this._http.post<T>(`${this._baseURL}/${this._resource}`, data);
  }

  /**
   * Implementação do verbo PATCH.
   * Atualização parcial do registro, o 'ID' DEVE ser submetido na requisição.
   * @param id 
   * @param data 
   */
  patch(id: number | string, data: S): Observable<T> {
    return this._http.patch<T>(`${this._baseURL}/${this._resource}/${id}`, data);
  }

  /**
   * Implementação do verbo PUT.
   * Atualização completa do registro, o 'ID' deve ser submetido na requisição.
   * @param data 
   */
  put(id: number | string, data: S): Observable<T> {
    return this._http.put<T>(`${this._baseURL}/${this._resource}/${id}`, data);
  }

}
