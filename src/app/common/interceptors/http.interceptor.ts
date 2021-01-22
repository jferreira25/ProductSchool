import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RouteStackService } from '../services/route-stack.service';
import { UtilService } from '../utils/util.service';
import { LoadingStatus } from '../utils/loading-status';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  private _reqRunning: number = 0;

  constructor(
    private router: Router,
    private routeStack: RouteStackService,
    private util: UtilService,
    private loading: LoadingStatus
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const token = this.util.getToken();

    if (this.util.isLogged()) {
      request = request.clone(
        { headers: request.headers.set('Authorization', `Bearer ${token}`) }
      );
    }

    this._reqRunning++;

    return from(this.handle(request, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {

    this.loading.show();

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: event.body.data });
        }
        return event;
      }),
      catchError((response: HttpErrorResponse) => {

        const genericError = 'Ocorreu um erro não esperado.';

        switch (response.status) {
          case 404:
          case 400:
            this.util.errorMsg([].concat(response.error['notifications']));
            break;
          case 401:
            this.util.snackMsg('Você não está autorizado à acessar esta funcionalidade');
            this.routeStack.goTo(this.router, '/auth/login');
            break;
          case 403:
            this.util.snackMsg('Você não possui permissão para acessar esta funcionalidade');
            break;
          default:
            this.util.snackMsg(genericError);
            break;
        }

        return throwError(response);
      }),
      finalize(() => {
        if (!--this._reqRunning)
          this.loading.hide();
      })
    ).toPromise();
  }
}
