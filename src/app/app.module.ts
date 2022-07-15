import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgoraConfig, NgxAgoraModule, NgxAgoraService } from 'ngx-agora';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CallingModule } from './calling/calling.module';
import { LoginModule } from './login/login.module';

const agoraConfig: AgoraConfig = {
  //AppID: '6663d715044b419b96f2f09fc551752b',
  AppID: '06816035cfd0499f83730740e406911a',
  
};
@NgModule({
  declarations: [
    AppComponent,
    //CallingComponent
    // AudioCallingComponent,
    // VideoCallingComponent
  ],
  imports: [
    //HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxAgoraModule.forRoot(agoraConfig),
    FormsModule,
    LoginModule,
    CallingModule
  ],
  providers: [NgxAgoraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
