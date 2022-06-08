import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WebcamModule} from 'ngx-webcam';
import { PinCodeComponent } from './component/pin-code/pin-code.component';
import { CameraComponent } from './component/camera/camera.component';
import { CodeInputModule } from 'angular-code-input';
@NgModule({
  declarations: [
    AppComponent,
    PinCodeComponent,
    CameraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    CodeInputModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

 }
