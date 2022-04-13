import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {StudentModel} from '../models';

@Injectable({
  providedIn: 'root'
})

export class StudentHttpService {
  private API_URL: string = `${environment.API_URL}/students`;

  constructor(private httpClient: HttpClient) {

  }

  getStudents(level: number | null): Observable<StudentModel[]> {
    const url = `${this.API_URL}`;
    let params = new HttpParams();
    if (level) {
      params = params.append('level', level);
    }

    return this.httpClient.get<StudentModel[]>(url, {params})
      .pipe(
        map(response => response['data'])
      );
  }

  createStudent(student: StudentModel): Observable<StudentModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<StudentModel>(url, student)
      .pipe(
        map(response => response['data'])
      );
  }
}

