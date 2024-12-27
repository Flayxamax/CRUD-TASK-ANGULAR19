import { Component, inject, signal, effect } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '../../data-access/task.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styles: ``,
  providers: [TaskService],
})
export default class TaskListComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  loading = this._taskService.loading;

  formSearch = this._formBuilder.group({
    taskS: this._formBuilder.control(''),
  });

  constructor() {
    effect(() => {
      const allTasks = this._taskService.getTasks();
      this.tasks.set(allTasks);
    });
  }

  search() {
    const { taskS } = this.formSearch.value;

    if (taskS) {
      this._taskService.searchTaskByTitle(taskS).subscribe((tasks) => {
        this.tasks.set(tasks);
      });
    } else {
      this.tasks.set(this._taskService.getTasks());
    }
  }
}
