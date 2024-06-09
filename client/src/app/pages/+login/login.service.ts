import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { setSessionStorage } from '../../../utils/cache';
import { AuthService } from '../../auth/auth.service';

interface Res {
  code: number;
  token: string;
  user: Object;
  message: string;
}

@Injectable()
export class LoginService {
  //  注入顺序要和module 中providers中deps顺序一致
  constructor(private authService: AuthService, private http: HttpClient) { }

  public Login(obj: any) {
    let body = {
      username: obj.username,
      password: obj.password
    };
    return this.http
      .post<Res>('/api/login', body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        })
      })
      .subscribe((ret: Res) => {
        if (ret.code === 1) {
          setSessionStorage('token', ret.token);
          setSessionStorage('user', JSON.stringify(ret.user));
          this.authService.redirect();
        } else {
          throw new Error(ret.message);
        }
      })
    // .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
