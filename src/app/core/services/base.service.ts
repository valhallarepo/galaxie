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
   * Implementação do verbo GET para a recuperação de registro único.
   * @param data 
   */
  get(data: S): Observable<T> {
    return this._http.get<T>(`${this._baseURL}/${this._resource}/${data.id}`);
  }

  /**
   * Implementação do verbo GET para a recuperação de múltiplos registros.
   * @param data 
   */
  all(data?: S): Observable<T> {
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
   * Implementação dos verbos POST e PUT.
   * 
   * POST: Novo registro, o ID não deve ser submetido na requisição.
   * PUT:  Atualização completa do registro, o ID deve ser submetido na requisição.
   * @param data 
   */
  save(data: S): Observable<T> {
    // POST
    if (!data.id) {
      return this._http.post<T>(`${this._baseURL}/${this._resource}`, data);
    }

    // PUT
    return this._http.put<T>(`${this._baseURL}/${this._resource}/${data.id}`, data);
  }

  /**
   * Implementação do verbo PATCH para atualização parcial do registro, o ID deve ser submetido na requisição.
   * @param id 
   * @param data 
   */
  patch(id: number, data: S): Observable<T> {
    return this._http.patch<T>(`${this._baseURL}/${this._resource}/${id}`, data);
  }

  /**
   * Implementação do verbo DELETE para a deleção de um registro.
   * @param data 
   */
  remove(id: number | string): Observable<T> {
    return this._http.delete<T>(`${this._baseURL}/${this._resource}/${id}`);
  }

}
