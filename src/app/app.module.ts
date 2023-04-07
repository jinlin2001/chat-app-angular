import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../+state';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreateRoomComponent,
    RoomComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ ...reducers }, {}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', component: CreateRoomComponent },
        { path: 'room-id/:roomId', component: RoomComponent },
        { path: '**', redirectTo: '' },
      ],
      { useHash: true }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
