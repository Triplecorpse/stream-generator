import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class ViewerDetectionService {

  private subject: Rx.Subject<MessageEvent>;
  public connection: Rx.ReplaySubject<any>;
  public ws;

  constructor() {
    this.connection = new Rx.ReplaySubject();
  }

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    ws.onopen = () => {
      this.connection.next({text: 'Connection established'});
    };
    this.ws = ws;

    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
