import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable()
export class CandidateService {

  private url: string = config.url;

  constructor(private httpClient: HttpClient) { }

  GetCandidate(): Observable<any> {
    return this.httpClient.get(`${this.url}/candidate`);
  }

}