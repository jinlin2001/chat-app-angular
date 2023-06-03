import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { selectors } from '../../+state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() showTitle!: boolean;
  all$!: Subscription;
  roomList!: string[];
  joined?: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.all$ = combineLatest([
      this.store.select(selectors.allRooms),
      this.store.select(selectors.joined),
    ]).subscribe(([rooms, joined]) => {
      this.roomList = rooms.list.filter((room) => room !== joined?.id);
      this.joined = joined?.id;
    });
  }

  ngOnDestroy(): void {
    this.all$.unsubscribe();
  }
}
