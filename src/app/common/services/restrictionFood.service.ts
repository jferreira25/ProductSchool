import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestrictionFoods } from '../models/restrictionFoods';


@Injectable({
    providedIn: 'root'
  })
  export class RestrictionFoodService {
  
    private _baseUrl: string = `${environment.apiUrl}/restrictionFoods`;
  
    constructor(
      private http: HttpClient
    ) { }
  
    public get(id: number): Observable<RestrictionFoods> {
      return this.http.get<RestrictionFoods>(`${this._baseUrl}/${id}`);
    }
  
    public filter(value: any): Observable<RestrictionFoods[]> {
      let params = new HttpParams()
         .append('name', value.name);
        // .append('currentPage', value.currentPage)
        // .append('pageLength', value.pageLength);
  
      return this.http.get<RestrictionFoods[]>(`${this._baseUrl}/filter`, { params });
    }
    
    public post(allergie: RestrictionFoods): Observable<any> {
      return this.http.post<any>(this._baseUrl, allergie);
    }
  
    public put(restrictionFood: RestrictionFoods): Observable<any> {
      return this.http.put<any>(`${this._baseUrl}/${restrictionFood.id}`, restrictionFood);
    }
    
  }
  