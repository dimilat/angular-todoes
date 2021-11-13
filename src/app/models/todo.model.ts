export class Todo {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public editing!: boolean;

  constructor(model?: Partial<Todo>) {
    Object.assign(this, model || {});
  }
}
