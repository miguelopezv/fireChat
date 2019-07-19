import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  AngularFirestore
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../../environments/environment';

import * as fromContainers from './containers';
import { ChatLayoutComponent } from '../chat/containers';

@NgModule({
  declarations: [fromContainers.AppComponent, ChatLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
