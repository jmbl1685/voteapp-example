import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class VoterService {

  private url: string = config.url;

  constructor(private httpClient: HttpClient) { }

  Vote(voter): Observable<any> {
    return this.httpClient.post(`${this.url}/voter`, voter);
  }

}