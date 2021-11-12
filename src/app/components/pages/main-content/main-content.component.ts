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
  config: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.initTodos();
  }

  async initTodos() {
    try {
      await this.configService.getTodos()
        .subscribe((data: Todo[]) =>
          this.todos = data
        );
    } catch (error) {
      console.log(error, "[getTodos]")
    }
  }

  async createTodo() {
    try {
      this.newTodo.id = this.todos.length;
      this.newTodo.completed = false;
      this.newTodo.editing = false;
      await this.configService.createTodo(this.produceId(), this.newTodo.title, this.newTodo.completed, this.newTodo.editing).toPromise();
      this.todos.push(this.newTodo);
    } catch (error) {
      console.log(error, "[createTodo]")
    }
  }

  async deleteTodo(todoId: number) {
    try {
      await this.configService.deleteTodo(todoId).toPromise();
      let index = this.todos.findIndex((todo) => todo.id === todoId);
      this.todos.splice(index, 1);
    } catch (error) {
      console.log(error, "[deleteTodo]")
    }
  }

  openCreateModal(): void {
    var myModal = new bootstrap.Modal(<HTMLElement>document.getElementById("createModal"));
    myModal.show();
  }

  produceId(): number {
    let i = 1;
    while (i < this.todos.length + 10) {
      const todo = this.todos.find(todo => {
        todo.id === i;
      });
      if (!todo)
        break;
      else
        i++;

    }
    console.log(i);
    return i;
  }
}
