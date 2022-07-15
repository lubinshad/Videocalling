import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioCallingComponent } from './audio-calling/audio-calling.component';
import { CallingComponent } from './calling.component';
import { VideoCallingComponent } from './video-calling/video-calling.component';


const routes: Routes = [
    { path: '',redirectTo: 'call' ,pathMatch: 'full'},
  { path: 'call', pathMatch: 'full',component: CallingComponent },
  { path: 'videocall', pathMatch: 'full',component: VideoCallingComponent },
  { path: 'audiocall',  pathMatch: 'full',component: AudioCallingComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CallingRoutingModule { }
