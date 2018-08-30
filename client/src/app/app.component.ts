import { Component, OnInit } from '@angular/core';
import { CandidateService } from './services/candidate.services';
import { VoterService } from './services/voter.services';
import { SocketService } from './services/socket.services';

import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  candidateList: Array<any> = [];

  btn_vote: boolean = true;

  voter: any = {
    name: "",
    identification: "",
    gender: "",
    birthdate: ""
  };

  settings_candidatelist: any = {
    opacity: 0.5,
    disable: true
  };

  constructor(
    private candidateService: CandidateService,
    private voterService: VoterService,
    public socketservice: SocketService,
    public iziToast: Ng2IzitoastService,
  ) {
    this.GetCandidate();
  }

  ngOnInit() {

    this.socketservice.onSocket().subscribe(
      res => {
        if (res.option == 'vote')
          this.GetCandidate();
      },
      err => {
        console.log(err)
      }
    )

  }

  GetCandidate() {
    this.candidateService.GetCandidate().subscribe(res => {
      this.candidateList = res;
    })
  }

  Change(event) {
    this.Validation(this.voter)
  }

  VoteActivate() {
    this.settings_candidatelist.disable = false
    this.settings_candidatelist.opacity = 1
  }

  Vote(id) {
    this.voter.candidateVote = id
    this.voterService.Vote(this.voter).subscribe(
      res => {
        this.FieldsClean();

        this.ShowNotification(
          '<b>Gracias por votar</b>',
          '/assets/img/SUCCESS.png',
          '#0275D8')

        this.socketservice.Vote(res);
      },
      err => {
        const error = err.error.err;
        this.VoteHandleError(error);
      }
    )
  }

  Validation(json) {
    for (let key in json) {
      if (json[key].trim() === "") {
        this.settings_candidatelist.opacity = 0.5;
        this.settings_candidatelist.disable = true;
        this.btn_vote = true;
        return;
      }
    }
    this.btn_vote = false;
    return;
  }

  VoteHandleError(error) {

    switch (error.name) {

      case "ValidationError": {

        this.ShowNotification(
          '<b>Ha ocurrido un error</b>',
          '/assets/img/ERROR.png',
          '#D9534F'
        );
        break;

      }

      case "BulkWriteError": {
        if (error.errmsg.includes('E11000 duplicate key error index: mongod.voters.$identification_1 dup key')) {

          this.ShowNotification(
            '<b>Este usuario ya ejerció su derecho al voto.</b>',
            '/assets/img/ERROR.png',
            '#0275D8'
          );
        }
        break;

      }
      default:
        break;
    }

  }

  ShowNotification(_message, _img, _bgColor) {
    this.iziToast.show({
      id: 'haduken',
      theme: 'dark',
      title: 'Notificación',
      message: _message,
      position: 'topCenter',
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      progressBarColor: 'rgb(0, 255, 184)',
      image: _img,
      imageWidth: 70,
      layout: 2,
      backgroundColor: _bgColor,
      onClosing: function () {
        console.info('onClosing');
      },
      onClosed: function (instance, toast, closedBy) {
        console.info('Closed | closedBy: ' + closedBy);
      }
    });
  }

  FieldsClean() {
    this.voter = {};
    this.btn_vote = true;
    this.settings_candidatelist = {
      opacity: 0.5,
      disable: true
    }
  }

}