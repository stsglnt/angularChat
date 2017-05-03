import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireModule } from 'angularfire2';
import {MdTooltipModule} from '@angular/material';

export const firebaseConfig = {
    apiKey: "AIzaSyDfSy6KdtVtU_03nyRRvu_E1g6yIIqcokU",
    authDomain: "mychatapp-cb92d.firebaseapp.com",
    databaseURL: "https://mychatapp-cb92d.firebaseio.com",
    storageBucket: "mychatapp-cb92d.appspot.com",
    messagingSenderId: "618083791013"
  };
  
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    MdTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

