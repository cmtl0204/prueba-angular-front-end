import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {CredentialModel, StudentModel} from '../models';

@Injectable({
  providedIn: 'root'
})

export class LoginHttpService {
  private API_URL: string = `${environment.API_URL}`;

  constructor(private httpClient: HttpClient) {

  }

  login(credentials: CredentialModel): Observable<string> {
    const url = `${this.API_URL}/login`;

    return this.httpClient.post<string>(url, credentials)
      .pipe(
        map(response => response['token'])
      );
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }
}

