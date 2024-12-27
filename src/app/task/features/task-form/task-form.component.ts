import {
  Component,
  effect,
  inject,
  Inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  providers: [TaskService],
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loading = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
    date: this._formBuilder.control(new Date(), Validators.required),
  });

  constructor() {
    effect(() => {
      const id = this.idTask();
      if (!id) return;

      this.getTask(id);
    });
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed, date } = this.form.value;
      const task: TaskCreate = {
        title: title || '',
        completed: completed || false,
        date: date || new Date(),
      };

      const id = this.idTask();
      if (id) {
        await this._taskService.update(task, id);
      } else {
        await this._taskService.create(task);
      }

      toast.success(`Tarea ${id ? ' actualizada' : ' creada'} correctamente.`);
      this._router.navigate(['/tasks']);
    } catch (error) {
      toast.error('Error al crear la tarea');
    } finally {
      this.loading.set(false);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }
}
