import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  todos: Todo[] = [];
  config: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.initTodos();
  }

  initTodos() {
    this.configService.getTodos()
      .subscribe((data: Todo[]) =>
        this.todos = data
      );
  }
}
