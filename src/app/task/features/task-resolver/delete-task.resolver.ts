import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskResolver implements Resolve<any> {
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const idTask = route.paramMap.get('idTask');

    if (!idTask) {
      toast.error('No se encontró un ID de tarea válido en la URL.');
      throw new Error('No se encontró un ID de tarea válido en la URL.');
    }

    const taskSnapshot = await this._taskService.getTask(idTask);

    if (!taskSnapshot.exists()) {
      toast.error('Tarea no encontrada.');
      throw new Error('Tarea no encontrada.');
    }

    await this._taskService.delete(idTask);
    toast.success('Tarea eliminada correctamente.');

    this._router.navigate(['/tasks']);
  }
}
