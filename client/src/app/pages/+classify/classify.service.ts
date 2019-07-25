import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClassifyService {
  private url: string = '/api/movie';
  constructor(private http: HttpClient) {}

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

  public getClassifyMovies(classify: string, limit: number, offset: number): Promise<any> {
    let url = `${this.url}/classify/${classify}?limit=${limit}&offset=${offset}`;
    return (
      this.http
        .get(url)
        .toPromise()
        // .then(res => res.json())
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
