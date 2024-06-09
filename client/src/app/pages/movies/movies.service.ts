import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getSessionStorage } from '../../../utils/cache';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {
  private headers;
  private url = '/api/movies';
  private url_get = '/api/movie';

  constructor(private http: HttpClient) {
    let token = null;
    try {
      token = getSessionStorage('token');
    } catch (err) { }
    const authorization = `Bearer ${token}`;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: authorization });
  }

  getMovies(): Promise<any> {
    return (
      this.http
        .get(this.url_get)
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  getMovie(id: number): Promise<any> {
    const url = `${this.url_get}/${id}`;
    return (
      this.http
        .get(url)
        .toPromise()
        // .then(response => response.json())
        .catch(this.handleError)
    );
  }

  addMovie(movie: any): Promise<any> {
    return (
      this.http
        .post(this.url, JSON.stringify(movie), { headers: this.headers })
        .toPromise()
        // .then(res => res.json())
        .catch(this.handleError)
    );
  }

  updateMovie(movie: any): Promise<any> {
    const url = `${this.url}/${movie.id}`;
    return this.http
      .put(url, JSON.stringify(movie), { headers: this.headers })
      .toPromise()
      .then(() => movie)
      .catch(this.handleError);
  }

  deleteMovie(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
