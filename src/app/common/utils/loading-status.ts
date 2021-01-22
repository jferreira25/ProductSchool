import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStatus {

  private loadingShowing: BehaviorSubject<boolean>;

  constructor() {
    this.loadingShowing = new BehaviorSubject(false);
  }

  public show(): void {
    this.loadingShowing.next(true);
  }

  public hide(): void {
    this.loadingShowing.next(false);
  }

  public listen(): Observable<boolean> {
    return this.loadingShowing.asObservable();
  }
}
