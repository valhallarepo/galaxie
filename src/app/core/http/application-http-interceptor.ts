import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const dupReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
                .append('api_key', environment.API_KEY)
                .append('language', 'pt-BR')
        });

        return next.handle(dupReq).pipe(catchError(this.handleError({})));
    }

    /**
     * Trata as requisições HTTP que falham
     * @param result - optional value to return as the observable result
     */
    private handleError(result?: any) {
        return (error: any): Observable<any> => {

            // TODO: Enviar o log de erro para os servidores do Olá
            console.error(error);

            // Mostra mensagem na tela
            this.showErrorMessage(error);

            // O aplicativo continua em execução e retorna um resultado vazio
            return result;
        };
    }

    private showErrorMessage(error: any): void {
        // TODO: Aguardando definição da equipe de designers
    }

}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApplicationHttpInterceptor,
            multi: true
        }
    ]
})
export class Interceptor { }
