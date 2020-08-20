import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseModel } from '../../core/model/base.model';
import { AbstractBaseService } from './abstract-base.service';

export class BaseService<T extends BaseModel> extends AbstractBaseService<T> {

  private URI: string;

  constructor(resource: string, http: HttpClient) {
    super(resource, http);
    this.URI = `${this.getServerURL()}/${this.getResource()}`;
  }

  /**
   * Implementação do verbo GET para a recuperação de registro único.
   * @param data 
   */
  get(data: T): Observable<T> {
    const options = this.getHttpHeaderOptionToken();
    return this.getHttp().get<T>(`${this.URI}/${data.id}`, options as Object);
  }

  /**
   * Implementação do verbo GET para a recuperação de múltiplos registros.
   * @param data 
   */
  all(data?: T): Observable<Array<T>> {
    const options = this.getHttpHeaderOptionToken();

    if (data) {
      options.params = new HttpParams();
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          options.params = options.params.set(key, data[key]);
        }
      });
    }

    return this.getHttp().get<Array<T>>(`${this.URI}`, options as Object);
  }

  /**
   * Implementação dos verbos POST e PUT.
   * 
   * POST: Novo registro, o ID não deve ser submetido na requisição.
   * PUT:  Atualização completa do registro, o ID deve ser submetido na requisição.
   * @param data 
   */
  save(data: T): Observable<T> {
    const options = this.getHttpHeaderOptionToken();
    options.params = new HttpParams();

    // POST
    if (!data.id) {
      return this.getHttp().post<T>(this.URI, data, options as Object);
    }

    // PUT
    return this.getHttp().put<T>(`${this.URI}/${data.id}`, data, options as Object);
  }

  /**
   * Implementação do verbo PATCH para atualização parcial do registro, o ID deve ser submetido na requisição.
   * @param id 
   * @param data 
   */
  patch(id: number, data: T): Observable<T> {
    const options = this.getHttpHeaderOptionToken();
    options.params = new HttpParams();

    if (data) {
      Object.keys(data).forEach(keyP => {
        if ((data[keyP] !== null && data[keyP] !== undefined) || typeof data[keyP] === 'number') {
          options.params = options.params.set(keyP, data[keyP]);
        }
      });
    }

    return this.getHttp().patch<T>(`${this.URI}/${id}`, data, options as Object);
  }

  /**
   * Implementação do verbo DELETE para a deleção de um registro.
   * @param data 
   */
  remove(id: number | string): Observable<T> {
    const options = this.getHttpHeaderOptionToken();
    options.params = new HttpParams();

    if (id) {
      return this.getHttp().delete<T>(`${this.URI}/${id}`, options as Object);
    }

    return;
  }

}
