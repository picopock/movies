import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class DetailService {
  // private headers = new Headers({'co'})
  private url = '/api/movie';

  constructor(private http: HttpClient) {}

  public getCurMovie(id: number): Promise<any> {
    let url = `${this.url}/detail/${id}`;
    return (
      this.http
        .get(url)
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  public getHotMovies(limit: number): Promise<any> {
    let url = `${this.url}/hot?limit=${limit}`;
    return (
      this.http
        .get(url)
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
