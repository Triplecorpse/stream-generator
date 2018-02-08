import {Injectable} from '@angular/core';
import {Subject, ReplaySubject} from 'rxjs/Rx';
import {ViewerDetectionService} from "./viewer-detection.service";
import {Observable} from "rxjs/Observable";

const viewerUrl = 'ws://localhost:3333/';

@Injectable()
export class ViewerDetectionOutputService {

  constructor(public wsService: ViewerDetectionService) {
    this.messages = <Subject<any>>wsService
      .connect(viewerUrl)
      .map((response: MessageEvent): any => {
        const data = JSON.parse(response.data);
        return data;
      });

    const msgQ = this.messages.share();

    this.persons_alive = msgQ
      .filter((response: any): any => {
        return response.subject === 'persons_alive';
      })
      .map(alive => {
        return alive.data;
      });

    this.person_update = msgQ
      .filter((response: any): any => {
        return response.subject === 'person_update';
      })
      .map(update => {
        return update.data;
      });

    this.manifest = msgQ
      .filter((response: any): any => {
        return response.subject === 'manifest';
      })
      .map(manifest => {
        return manifest.data;
      });

    this.buzzer = msgQ
      .filter((response: any): any => {
        return response.subject === 'buzzer';
      })
      .map(buzzer => {
        return buzzer.data;
      });

    this.external_input = msgQ
      .filter((response: any): any => {
        return response.subject === 'external_input';
      })
      .map(external_input => {
        return external_input.data;
      });

    this.rpc = msgQ
      .filter((response: any): any => {
        return response.type === 'rpc_response';
      });
  }

  public persons_alive: Observable<any>;
  public person_update: Observable<any>;
  public manifest: Observable<any>;
  public buzzer: Observable<any>;
  public external_input: Observable<any>;
  public rpc: Observable<any>;

  public messages: Subject<any>;
  public up: Subject<any>;
  public connection: Observable<any> = this.wsService.connection;
  public ws = this.wsService.ws;
}
