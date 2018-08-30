import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CandidateService } from './services/candidate.services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { VoterService } from './services/voter.services';
import { SocketService } from './services/socket.services';

import { Ng2IziToastModule } from 'ng2-izitoast';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2IziToastModule 
  ],
  providers: [
    CandidateService,
    VoterService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
