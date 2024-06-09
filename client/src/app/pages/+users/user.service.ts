import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getSessionStorage } from '../../../utils/cache';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private url = '/api/user';

  constructor(private http: HttpClient) {
    let token = null;
    try {
      token = getSessionStorage('token');
    } catch (err) { }
    const authorization = `Bearer ${token}`;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: authorization });
  }

  getUsers(): Promise<any> {
    return (
      this.http
        .get(this.url, { headers: this.headers })
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  getUser(id: number): Promise<any> {
    const url = `${this.url}/${id}`;
    return (
      this.http
        .get(url, { headers: this.headers })
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  addUser(user: any): Promise<any> {
    return (
      this.http
        .post(this.url, JSON.stringify(user), { headers: this.headers })
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  updateUser(user: any): Promise<any> {
    const url = `${this.url}/${user.id}`;
    return (
      this.http
        .put(url, JSON.stringify(user), { headers: this.headers })
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  deleteUser(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getPermissionList(): Promise<any> {
    const url = `${this.url}/permission/list`;
    return (
      this.http
        .get(url, { headers: this.headers })
        .toPromise()
        // .then(res => {
        //   // return res.json();
        // })
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
