import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../app.config';

const SERVER_URL = config.url.replace('/api', '');
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private url = SERVER_URL;

  private socket;
  constructor() { }

  emitSocket() {
    this.socket = io(this.url);
  }

  onSocket(): Observable<any> {
    return new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('ALL_EVENTS', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
  }

  public Vote(data): void {
    this.socket.emit('ALL_EVENTS', { data, option: 'vote' });
  }

}