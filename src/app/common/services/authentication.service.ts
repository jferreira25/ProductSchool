import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _baseUrl: string = `${environment.apiUrl}/authentication`;

  constructor(
    private http: HttpClient
  ) { }

  public auth(login: any): Observable<any> {
    return this.http.post<any>(this._baseUrl, login);
  }
}
