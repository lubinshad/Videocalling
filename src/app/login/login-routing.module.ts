import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallingComponent } from '../calling/calling.component';
import { LoginComponent } from './login.component';
//import { AudioCallingComponent } from './audio-calling/audio-calling.component';
///import { CallingComponent } from './calling.component';
//import { VideoCallingComponent } from './video-calling/video-calling.component';


const routes: Routes = [
  //  { path: '',redirectTo: 'call' ,pathMatch: 'full'},
  { path: 'log', pathMatch: 'full',component: LoginComponent },
  //{ path: 'videocall', pathMatch: 'full',component: VideoCallingComponent },
  //{ path: 'audiocall',  pathMatch: 'full',component: AudioCallingComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
