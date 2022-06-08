import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{PinCodeComponent} from './component/pin-code/pin-code.component'
import{CameraComponent} from './component/camera/camera.component'

const routes: Routes = [
  { path: 'pincode', component: PinCodeComponent },
  { path: 'camera', component: CameraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
