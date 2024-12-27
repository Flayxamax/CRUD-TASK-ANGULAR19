import { inject, Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);

  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  get currentUser() {
    return getAuth().currentUser;
  }

  logout() {
    return signOut(this._auth);
  }
}
