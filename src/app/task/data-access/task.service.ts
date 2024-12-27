import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { catchError, tap, throwError, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthStateService } from '../../shared/data-access/auth-state.service';

const PATH = 'tasks';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
}

export type TaskCreate = Omit<Task, 'id'>;

@Injectable()
export class TaskService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  private _authState = inject(AuthStateService);

  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );

  loading = signal<boolean>(true);

  getTasks = toSignal(
    (collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

  constructor() {}

  getTask(id: string) {
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }

  create(task: TaskCreate) {
    return addDoc(this._collection, {
      ...task,
      userId: this._authState.currentUser?.uid,
    });
  }

  update(task: TaskCreate, id: string) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {
      ...task,
      userId: this._authState.currentUser?.uid,
    });
  }

  delete(id: string) {
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef);
  }

  searchTaskByTitle(title: string) {
    const titleQuery = query(
      this._collection,
      where('userId', '==', this._authState.currentUser?.uid)
    );

    return collectionData(titleQuery, { idField: 'id' }).pipe(
      map((tasks) => {
        return tasks.filter((task) =>
          task['title'].toLowerCase().includes(title.toLowerCase())
        );
      })
    ) as Observable<Task[]>;
  }
}
