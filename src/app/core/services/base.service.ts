import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { IRequest } from '../model/irequest';
import { IResponse } from '../model/iresponse';
import { IBaseService } from './ibase.service';

export class BaseService<S extends IRequest, T extends IResponse> implements IBaseService<S, T> {

  private resource: string;
  private http: HttpClient;
  private uri: string;

  constructor(resource: string, http: HttpClient) {
    this.resource = resource;
    this.http = http;
    this.uri = `${this.getServerURL()}/${this.getResource()}`;
  }

  protected getResource(): string {
    return this.resource;
  }

  protected getHttp(): HttpClient {
    return this.http;
  }

  protected getServerURL(): string {
    return `${environment.API_SERVER}`;
  }

  protected getHttpHeaderOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  /**
   * Implementação do verbo GET para a recuperação de registro único.
   * @param data 
   */
  get(data: S): Observable<T> {
    const options = this.getHttpHeaderOptions();
    options.params = new HttpParams();
    options.params = options.params.set('api_key', environment.API_KEY);
    options.params = options.params.set('language', 'pt-BR');

    return this.getHttp().get<T>(`${this.uri}/${data.id}`, options as Object);
  }

  /**
   * Implementação do verbo GET para a recuperação de múltiplos registros.
   * @param data 
   */
  all(data?: S): Observable<T> {
    const options = this.getHttpHeaderOptions();
    options.params = new HttpParams();
    options.params = options.params.set('api_key', environment.API_KEY);
    options.params = options.params.set('language', 'pt-BR');

    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          options.params = options.params.set(key, data[key]);
        }
      });
    }

    return this.getHttp().get<T>(`${this.uri}`, options as Object);
  }

  /**
   * Implementação dos verbos POST e PUT.
   * 
   * POST: Novo registro, o ID não deve ser submetido na requisição.
   * PUT:  Atualização completa do registro, o ID deve ser submetido na requisição.
   * @param data 
   */
  save(data: S): Observable<T> {
    const options = this.getHttpHeaderOptions();
    options.params = new HttpParams();

    // POST
    if (!data.id) {
      return this.getHttp().post<T>(this.uri, data, options as Object);
    }

    // PUT
    return this.getHttp().put<T>(`${this.uri}/${data.id}`, data, options as Object);
  }

  /**
   * Implementação do verbo PATCH para atualização parcial do registro, o ID deve ser submetido na requisição.
   * @param id 
   * @param data 
   */
  patch(id: number, data: S): Observable<T> {
    const options = this.getHttpHeaderOptions();
    options.params = new HttpParams();

    if (data) {
      Object.keys(data).forEach(keyP => {
        if ((data[keyP] !== null && data[keyP] !== undefined) || typeof data[keyP] === 'number') {
          options.params = options.params.set(keyP, data[keyP]);
        }
      });
    }

    return this.getHttp().patch<T>(`${this.uri}/${id}`, data, options as Object);
  }

  /**
   * Implementação do verbo DELETE para a deleção de um registro.
   * @param data 
   */
  remove(id: number | string): Observable<T> {
    const options = this.getHttpHeaderOptions();
    options.params = new HttpParams();

    if (id) {
      return this.getHttp().delete<T>(`${this.uri}/${id}`, options as Object);
    }

    return;
  }

}
