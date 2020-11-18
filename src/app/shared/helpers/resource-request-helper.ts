import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export class ResourceRequestHelper<Req, Resp> {

  private httpClient: HttpClient;
  private apiKey: string;
  private baseUrl: string;
  private resource: string;

  constructor(http: HttpClient, backend: any, resource: string) {
    this.httpClient = http;
    this.apiKey = backend.apiKey;
    this.baseUrl = backend.baseUrl;
    this.resource = resource;
  }

  /**
   * Implementação do verbo DELETE
   * Exclusão de um registro com base no 'ID' do registro.
   */
  delete(id: number | string): Observable<Resp> {
    return this.httpClient.delete<Resp>(`${this.baseUrl}/${this.resource}/${id}`, this.getHttpOptions());
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base no 'ID' ou nos filtros informados.
   */
  get(id?: number | string, data?: Req): Observable<Resp> {

    if (id) {
      return this.httpClient.get<Resp>(`${this.baseUrl}/${this.resource}/${id}`, this.getHttpOptions());
    }

    return this.find(data);
  }

  /**
   * Implementação do verbo POST.
   * Criação de um novo registro, o 'ID' NÃO deve ser submetido na requisição.
   */
  post(data: Req): Observable<Resp> {
    return this.httpClient.post<Resp>(`${this.baseUrl}/${this.resource}`, data, this.getHttpOptions());
  }

  /**
   * Implementação do verbo PATCH.
   * Atualização parcial do registro, o 'ID' DEVE ser submetido na requisição.
   */
  patch(id: number | string, data: Req): Observable<Resp> {
    return this.httpClient.patch<Resp>(`${this.baseUrl}/${this.resource}/${id}`, data, this.getHttpOptions());
  }

  /**
   * Implementação do verbo PUT.
   * Atualização completa do registro, o 'ID' deve ser submetido na requisição.
   */
  put(id: number | string, data: Req): Observable<Resp> {
    return this.httpClient.put<Resp>(`${this.baseUrl}/${this.resource}/${id}`, data, this.getHttpOptions());
  }

  /**
   * Recupera os Options da requisição
   */
  private getHttpOptions(): HttpOptions {

    const httpOptions = {} as HttpOptions;
    httpOptions.headers = new HttpHeaders();
    httpOptions.headers.set('Content-Type', 'application/json');

    httpOptions.params = new HttpParams();
    httpOptions.params = httpOptions.params.set('api_key', this.apiKey);

    return httpOptions;
  }

  /**
   * Implementação do verbo GET.
   * Recuperação de registros com base nos fitros informados.
   */
  private find(data?: Req): Observable<Resp> {
    const options = this.getHttpOptions();

    if (data) {
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          options.params = (options.params as HttpParams).set(key, data[key]);
        }
      });
    }

    return this.httpClient.get<Resp>(`${this.baseUrl}/${this.resource}`, options);
  }

}
