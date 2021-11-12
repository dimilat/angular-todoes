import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'https://instinctive-fork-snarl.glitch.me';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get<Todo[]>(this.configUrl + '/todos');
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<Todo>(this.configUrl + `/todos/${id}`);
  }

  createTodo(id: number, title: string, completed: boolean, editing: boolean): Observable<any> {
    console.log({
      id,
      title,
      completed,
      editing
    });
    return this.http.post<Todo>(this.configUrl + '/todos',
      {
        id,
        title,
        completed,
        editing
      }
    );
  }

  updateTodo(): Observable<any> {
    return this.http.get<Todo[]>(this.configUrl + '/todos');
  }


}
