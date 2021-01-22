import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CEP } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  

  constructor(
    private http: HttpClient
  ) { }

  public get(cep: string): Observable<CEP> {
   
    return this.http.get<CEP>(` https://cors-anywhere.herokuapp.com/https://viacep.com.br/ws/${cep}/json`);
  }
}
