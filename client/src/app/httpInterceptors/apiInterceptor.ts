import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function apiIntercept(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const apiReq = req.clone({ url: `http://localhost:3000${req.url}`/* , withCredentials: true */ });
  return next(apiReq);
}
