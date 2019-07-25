import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface Res {
  ret_code: number;
}

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router, private _location: Location) {}

  login(): Promise<any> {
    return this.http
      .get('/api/isLogin')
      .toPromise()
      .then((res: Res) => {
        if (res.ret_code == 0) {
          this.isLoggedIn = true;
        }
        this.redirect();
      })
      .catch(this.handleError);
  }

  redirect() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.setRedirectUrl();
    } else {
      this._location.back();
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  setRedirectUrl(url?: string) {
    this.redirectUrl = url;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
