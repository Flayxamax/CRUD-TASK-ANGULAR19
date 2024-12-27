import { Routes } from '@angular/router';
import { DeleteTaskResolver } from './task-resolver/delete-task.resolver';
import { TaskService } from '../data-access/task.service';

export default [
  {
    path: '',
    loadComponent: () => import('./task-list/task-list.component'),
  },
  {
    path: 'new',
    loadComponent: () => import('./task-form/task-form.component'),
  },
  {
    path: 'edit/:idTask',
    loadComponent: () => import('./task-form/task-form.component'),
  },
  {
    path: 'delete/:idTask',
    loadComponent: () => import('./task-form/task-form.component'),
    resolve: {
      task: DeleteTaskResolver,
    },
    providers: [TaskService, DeleteTaskResolver],
  },
] as Routes;
