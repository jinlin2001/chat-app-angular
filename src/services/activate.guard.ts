import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectors } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class ActivateGuard {
  constructor(private store: Store, private router: Router) {}
  canActivate() {
    return this.store.select(selectors.joined).pipe(
      map((joined) => {
        if (!!joined) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
