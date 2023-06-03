import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectors } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class ActivateGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
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
