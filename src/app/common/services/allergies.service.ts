import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allergies } from '../models/allergies';
import { Paginator } from '../models/paginator';


@Injectable({
    providedIn: 'root'
  })
  export class AllergiesService {
  
    private _baseUrl: string = `${environment.apiUrl}/allergies`;
  
    constructor(
      private http: HttpClient
    ) { }
  
    public get(id: number): Observable<Allergies> {
      return this.http.get<Allergies>(`${this._baseUrl}/${id}`);
    }
  
    public filter(value: any): Observable<Allergies[]> {
      let params = new HttpParams()
         .append('name', value.name);
        // .append('currentPage', value.currentPage)
        // .append('pageLength', value.pageLength);
  
      return this.http.get<Allergies[]>(`${this._baseUrl}/filter`, { params });
    }

    
    public post(allergie: Allergies): Observable<any> {
      return this.http.post<any>(this._baseUrl, allergie);
    }
  
    public put(allergie: Allergies): Observable<any> {
      return this.http.put<any>(`${this._baseUrl}/${allergie.id}`, allergie);
    }
    
  }
  