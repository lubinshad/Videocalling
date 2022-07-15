import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallingComponent } from './calling.component';
import { CallingRoutingModule } from './calling-routing.module';
import { VideoCallingComponent } from './video-calling/video-calling.component';
import { AudioCallingComponent } from './audio-calling/audio-calling.component';

@NgModule({
  declarations: [CallingComponent,
    VideoCallingComponent,
    AudioCallingComponent],
  imports: [
    CommonModule,
    CallingRoutingModule,

  ]
})
export class CallingModule { }
