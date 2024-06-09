import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
  // private headers = new Headers({'co'})
  private url = '/api/movie';

  constructor(private http: HttpClient) { }

  public getLatestMovies(limit: number): Promise<any> {
    let url = `${this.url}/latest?limit=${limit}`;
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

  public getPageMovies(curPage: number, limit: number = 10): Promise<any> {
    let url = `${this.url}/page?limit=${limit}&offset=${(curPage - 1) * limit}`;
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
