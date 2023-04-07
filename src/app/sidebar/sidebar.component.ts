import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRoomList, RoomList } from '../../+state/selectors/app.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  allRooms: RoomList = [];
  allRooms$!: Subscription;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.allRooms$ = this.store
      .select<RoomList>(selectRoomList)
      .subscribe((rooms) => {
        this.allRooms = rooms;
      });
  }
  ngOnDestroy(): void {
    this.allRooms$.unsubscribe();
  }
}
