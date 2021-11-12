import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>(this.configUrl + '/todos');
  }


}
