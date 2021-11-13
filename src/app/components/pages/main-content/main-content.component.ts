import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Todo } from 'src/app/models/todo.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = new Todo;
  editedTodo = new Todo;
  config: any;
  createLoading = false;
  deleteLoading = false;
  updateLoading = false;
  initLoading = false;
  editLoading = false;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.initTodos();
  }

  /**
   *
   *
   * @memberof MainContentComponent
   */
  async initTodos() {
    try {
      this.initLoading = true;
      await this.configService.getTodos()
        .subscribe((data: Todo[]) =>
          this.todos = data
        );
    } catch (error) {
      console.log(error, "[getTodos]")
    } finally {
      this.initLoading = false;
    }
  }

  /**
   *
   *
   * @memberof MainContentComponent
   */
  async createTodo() {
    try {
      this.createLoading = true;
      this.newTodo.id = this.todos.length;
      this.newTodo.completed = false;
      this.newTodo.editing = false;
      const todo = await this.configService.createTodo(this.newTodo.title, this.newTodo.completed, this.newTodo.editing).toPromise();
      this.todos.unshift(todo);
    } catch (error) {
      console.log(error, "[createTodo]")
    } finally {
      this.createLoading = false;
    }
  }

  /**
   *
   *
   * @param {number} todoId
   * @memberof MainContentComponent
   */
  async deleteTodo(todoId: number) {
    try {
      await this.configService.deleteTodo(todoId).toPromise();
      let index = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos.splice(index, 1);
    } catch (error) {
      console.log(error, "[deleteTodo]")
    } finally {
      this.deleteLoading = false;
    }
  }

  /**
   *
   *
   * @memberof MainContentComponent
   */
  async editTodo() {
    try {
      this.editLoading = true;
      this.editedTodo.id = this.todos.length;
      this.editedTodo.completed = false;
      this.editedTodo.editing = false;
      const todo = await this.configService.updateTodo(this.editedTodo.id, this.editedTodo.title, this.editedTodo.completed, this.newTodo.editing).toPromise();
      this.todos.unshift(todo);
    } catch (error) {
      console.log(error, "[editTodo]")
    } finally {
      this.editLoading = false;
    }
  }

  /**
   *
   *
   * @memberof MainContentComponent
   */
  openCreateModal(): void {
    var myModal = new bootstrap.Modal(<HTMLElement>document.getElementById("createModal"));
    myModal.show();
  }
}
