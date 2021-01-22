import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { LoginData } from '../models/login-data';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';
import { AbstractControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { base64StringToBlob } from 'blob-util';
import { DownloadResponse } from '../models/download-response';

@Injectable()
export class UtilService {

  private jwt: JwtHelperService;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.jwt = new JwtHelperService();
  }

  public logout(): void {
    localStorage.removeItem(environment.localStorageKey);
  }

  public isLogged(): boolean {
    return !!this.getToken();
  }

  public getToken(): string {
    var token = localStorage.getItem(environment.localStorageKey);
    return token;
  }

  public decodedToken(): LoginData {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwt.decodeToken(token);
      return new LoginData(
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        decoded['iss'],
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      );
    }

    return null;
  }

  public getTokenExpirationDate(): Date {
    const token = this.getToken();
    return token ? this.jwt.getTokenExpirationDate(token) : null;
  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwt.isTokenExpired(token) : false;
  }

  public setToken(token: string): void {
    if (token) {
      localStorage.removeItem(environment.localStorageKey);
      localStorage.setItem(environment.localStorageKey, token);
      this.snackMsg(`Bem vindo, ${this.decodedToken().username}!`);
    }
  }

  public snackMsg(msg: string): Observable<MatSnackBarDismiss> {
    const sb = this.snackBar.open(msg, null, {
      duration: 3000
    });
    return sb.afterDismissed();
  }

  public confirmMsg(msg: string): Observable<any> {
    const d = this.dialog.open(ConfirmDialogComponent, {
      data: msg,
      width: '50vh'
    });

    return d.afterClosed();
  }

  public errorMsg(msgs: string[]): Observable<any> {
    const d = this.dialog.open(ErrorDialogComponent, {
      data: msgs,
      width: '50vh'
    });

    return d.afterClosed();
  }

  public convertDateToString(obj: any): any {
    if (typeof obj !== 'object') return;

    for (let prop of Object.getOwnPropertyNames(obj)) {
      if (!(obj[prop] instanceof moment)) continue;
      obj[prop] = obj[prop].format('YYYY-MM-DD');
    }

    return obj;
  }

  public validateDateInPeriod(startDateFormControl: AbstractControl, startDate: string, endDate: string): void {
    const momentDate = startDateFormControl.value;
    startDateFormControl.setErrors(null);

    if (!(momentDate instanceof moment)) return;

    if (moment(momentDate).isBetween(startDate, endDate, null, '[]')) {
      startDateFormControl.setErrors({ dateInPeriod: 'A data se encontra em um período já informado' })
    }
  }

  public download(value: DownloadResponse): void {
    saveAs(base64StringToBlob(value.dataToDownload, value.mimeType), value.fileName);
  }
}
