import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { setSessionStorage } from '../../../utils/cache';
let md5 = require('blueimp-md5');

// import 'rxjs/add/operator/toPromise';

interface Res {
  code: number;
  token: string;
  user: Object;
  msg: string;
}

@Injectable()
export class RegistryService {
  constructor(private http: HttpClient, private router: Router) {}

  public regUser(obj: { [propName: string]: any }): Promise<any> {
    let body = Object.assign({}, obj, { password: obj.passwordsGroup.password });
    delete body.passwordsGroup;
    return (
      this.http
        .post('/api/register', body, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        })
        .toPromise()
        // .then(response => response.json())
        .then((res: Res) => {
          if (res.code == 1) {
            setSessionStorage('token', res.token);
            setSessionStorage('user', JSON.stringify(res.user));
            this.router.navigate(['/']);
          } else {
            console.log(res.msg);
          }
          return null;
        })
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
