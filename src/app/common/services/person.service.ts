import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allergies } from '../models/allergies';
import { Paginator } from '../models/paginator';
import { Person } from '../models/person';


@Injectable({
    providedIn: 'root'
  })
  export class PersonService {
  
    private _baseUrl: string = `${environment.apiUrl}/persons`;
  
    constructor(
      private http: HttpClient
    ) { }
  
    public get(id: number): Observable<Person> {
      return this.http.get<Person>(`${this._baseUrl}/${id}`);
    }
  
    public filter(value: any): Observable<Person[]> {
      let params = new HttpParams()
         .append('query', value.name);
        // .append('currentPage', value.currentPage)
        // .append('pageLength', value.pageLength);
  
      return this.http.get<Person[]>(`${this._baseUrl}/filter`, { params });
    }
    
    public post(allergie: Person): Observable<any> {
      return this.http.post<any>(this._baseUrl, allergie);
    }
  
    public put(person: Person): Observable<any> {
      return this.http.put<any>(`${this._baseUrl}/${person.id}`, person);
    }
    
  }
  