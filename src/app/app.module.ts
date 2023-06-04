import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '../+state';
import { ActivateGuard } from '../services/activate.guard';
import { AppComponent } from './app/app.component';
import MessageComponent from './message/message.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { RoomComponent } from './room/room.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/services/error-handler.service';
import { AppEffects } from '../+state/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RoomComponent,
    MessageComponent,
    RoomFormComponent,
  ],
  imports: [
    ToastrModule.forRoot({ extendedTimeOut: 2000, timeOut: 2000 }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ ...reducers }, {}),
    EffectsModule.forRoot([AppEffects]),
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          component: RoomFormComponent,
          data: { create: true },
        },
        {
          path: 'room',
          component: RoomComponent,
          canActivate: [ActivateGuard],
        },
        {
          path: 'join/:roomId',
          component: RoomFormComponent,
          data: { create: false },
        },
        { path: '**', redirectTo: '' },
      ],
      { useHash: true }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
