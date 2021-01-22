import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginator } from '../models/paginator';
import { environment } from 'src/environments/environment';
import { CaptionAnswer } from '../models/CaptionAnswer';


@Injectable({
    providedIn: 'root'
  })
  export class CaptionService {
  
    private _baseUrl: string = `${environment.apiUrl}/caption`;
  
    constructor(
      private http: HttpClient
    ) { }
  
    public get(id: number): Observable<CaptionAnswer> {
      return this.http.get<CaptionAnswer>(`${this._baseUrl}/${id}`);
    }
  
    // public filter(value: any): Observable<Paginator<CaptionAnswer>> {
    //   let params = new HttpParams()
    //     .append('countryId', value.country.id ? value.country.id : '')
    //     .append('name', value.name)
    //     .append('iata', value.iata)
    //     .append('icao', value.icao)
    //     .append('currentPage', value.currentPage)
    //     .append('pageLength', value.pageLength);
  
    //   return this.http.get<Paginator<CaptionAnswer>>(`${this._baseUrl}/filter`, { params });
    // }
    
    public post(captionAnswer: CaptionAnswer): Observable<any> {
      return this.http.post<any>(this._baseUrl, captionAnswer);
    }
  
    public put(captionAnswer: CaptionAnswer): Observable<any> {
      return this.http.put<any>(`${this._baseUrl}/${captionAnswer.id}`, captionAnswer);
    }
    
  }
  