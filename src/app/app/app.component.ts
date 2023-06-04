import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectors } from 'src/+state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chat-app';
  loading!: boolean;
  connected$!: Subscription;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.connected$ = this.store
      .select(selectors.connected)
      .subscribe((connected) => {
        this.loading = !connected;
      });
  }
  ngOnDestroy(): void {
    this.connected$.unsubscribe();
  }
}
