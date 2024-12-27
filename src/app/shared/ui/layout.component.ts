import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-layout',
  template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full">
        <a class="text-2xl font-bold flex items-center" routerLink="/tasks">
          <img class="w-16 h-16 mr-2" src="/assets/bocchi.webp" alt="logo" />
          <span>Ng MeowTasks</span>
        </a>
        <button
          type="button"
          class="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          (click)="logOut()"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
    <router-outlet />
  `,
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);
  async logOut() {
    await this._authState.logout();
    this._router.navigate(['/auth/sign-in']);
  }
}
