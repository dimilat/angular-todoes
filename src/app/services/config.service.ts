import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'https://instinctive-fork-snarl.glitch.me';

  constructor(private http: HttpClient) { }

  /**
   *
   *
   * @return {*}  {Observable<Todo[]>}
   * @memberof ConfigService
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.configUrl + '/todos');
  }

  /**
   *
   *
   * @param {number} id
   * @return {*}  {Observable<Todo>}
   * @memberof ConfigService
   */
  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.configUrl}/todos/${id}`);
  }

  /**
   *
   *
   * @param {number} id
   * @param {string} title
   * @param {boolean} completed
   * @param {boolean} editing
   * @return {*}  {Observable<Todo>}
   * @memberof ConfigService
   */
  createTodo(title: string, completed: boolean, editing: boolean): Observable<Todo> {
    return this.http.post<Todo>(this.configUrl + '/todos',
      {
        title,
        completed,
        editing
      }
    );
  }



  /**
   *
   *
   * @param {number} id
   * @param {string} title
   * @param {boolean} completed
   * @param {boolean} editing
   * @return {*}  {Observable<Todo>}
   * @memberof ConfigService
   */
  updateTodo(id: number, title: string, completed: boolean, editing: boolean): Observable<Todo> {
    return this.http.put<Todo>(`${this.configUrl}/todos/${id}`,
      {
        id,
        title,
        completed,
        editing: editing
      }
    );
  }


}
