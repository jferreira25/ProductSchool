import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification';
import { Paginator } from '../models/paginator';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _baseUrl: string = `${environment.apiUrl}/notifications`;
  private updateNotifications: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private util: UtilService
  ) {
    this.updateNotifications = new BehaviorSubject(null);
  }

  public get(id: string): Observable<Notification> {
    let params = new HttpParams()
      .append('username', this.util.decodedToken().username)

    return this.http.get<Notification>(`${this._baseUrl}/${id}`, { params });
  }

  public getAll(): Observable<Notification[]> {
    let params = new HttpParams()
      .append('username', this.util.decodedToken().username);

    return this.http.get<Notification[]>(this._baseUrl, { params });
  }

  public filter(value: any): Observable<Paginator<Notification>> {
    let params = new HttpParams()
      .append('username', this.util.decodedToken().username)
      .append('title', value.title)
      .append('description', value.description)
      .append('referenceDateStart', value.referenceDateStart)
      .append('referenceDateEnd', value.referenceDateEnd)
      .append('isVisualized', value.isVisualized ? value.isVisualized.value : '')
      .append('currentPage', value.currentPage)
      .append('pageLength', value.pageLength);

    return this.http.get<Paginator<Notification>>(`${this._baseUrl}/filter`, { params });
  }

  public visualize(notificationId: string): Observable<any> {
    return this.http.post(this._baseUrl, {
      notificationId: notificationId,
      username: this.util.decodedToken().username
    });
  }

  public mustUpdate(): void {
    this.updateNotifications.next(null);
  }

  public listen(): Observable<any> {
    return this.updateNotifications.asObservable();
  }
}
