import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ViewerDetectionOutputService} from "../viewer-detection-output.service";
import {DataService} from "../data.service";
import {IStair} from "../i-stair";
import * as _ from 'lodash';

declare const $: any;


@Component({
  selector: 'app-external-input',
  templateUrl: './external-input.component.html',
  styleUrls: ['./external-input.component.scss']
})
export class ExternalInputComponent implements OnInit, AfterViewInit {
  public buttonStatus: string = 'Buzzzz';
  public buzzerStatus: string = 'Didn\'t buzzzzed yet';
  public src: string = '';
  private $modal: any = null;
  public timesBuzzed: number = 0;
  public stairs: IStair[] = [
    {name: 'Stair 1', id: 1, isActive: false, lastActiveTimeUpdated: 0, lastLightTimeUpdated: 0, isLighten: false},
    {name: 'Stair 2', id: 2, isActive: false, lastActiveTimeUpdated: 0, lastLightTimeUpdated: 0, isLighten: false},
    {name: 'Stair 3', id: 3, isActive: false, lastActiveTimeUpdated: 0, lastLightTimeUpdated: 0, isLighten: false},
    {name: 'Stair 4', id: 4, isActive: false, lastActiveTimeUpdated: 0, lastLightTimeUpdated: 0, isLighten: false},
    {name: 'Stair 5', id: 5, isActive: false, lastActiveTimeUpdated: 0, lastLightTimeUpdated: 0, isLighten: false}
  ];

  constructor(public viewerDetectionOutput: ViewerDetectionOutputService, public dataService: DataService, private _rootNode: ElementRef) {
    viewerDetectionOutput.rpc.subscribe(message => {
      this.requestReceipt();
    });

    viewerDetectionOutput.buzzer.subscribe(data => {
      this.buzzerStatus = 'Last buzzzz on ' + new Date();
    });

    viewerDetectionOutput.external_input
      .filter(data => data.device_type === 'stair')
      .subscribe(data => {
        const id = +data.value.split(' ')[1];
        const stairIndex = this.stairs.findIndex(stair => stair.id === id);
        const eventName = data.key;

        if (eventName === 'push') {
          this.stairs[stairIndex].isActive = true;
          this.stairs[stairIndex].lastActiveTimeUpdated = new Date().getTime();
        } else if (eventName === 'light') {
          this.stairs[stairIndex].isLighten = true;
          this.stairs[stairIndex].lastLightTimeUpdated = new Date().getTime();
        }
      });

    setInterval(() => {
      this.stairs.forEach(stair => {
        const currentTime = new Date().getTime();

        if (stair.lastActiveTimeUpdated && currentTime - stair.lastActiveTimeUpdated >= 300) {
          stair.isActive = false;
          stair.lastActiveTimeUpdated = 0;
        }

        if (stair.lastLightTimeUpdated && currentTime - stair.lastLightTimeUpdated >= 300) {
          stair.isLighten = false;
          stair.lastLightTimeUpdated = 0;
        }
      })
    }, 400)
  }

  private requestReceipt() {
    this.dataService.getReceipt()
      .subscribe(receipt => {
        this.src = receipt.text();
        if (this.src && this.src !== 'OK' && this.src !== 'data:image/png;base64,') {
          this.$modal.modal('show');
        }
      })
  }

  buzz() {
    this.buttonStatus = 'Buzzzzing...';
    this.dataService.buzz()
      .subscribe(() => {
        this.timesBuzzed++;
        this.buttonStatus = 'Buzzzzed ' + this.timesBuzzed + ' times'
      });
  }

  emitStairEvent(event: MouseEvent) {
    const stair = +((event.target as Element).getAttribute('id'));

    if (stair) {
      this.dataService.stairEvent(stair, 'push').subscribe();
    }
  }

  ngAfterViewInit() {
    this.$modal = $(this._rootNode.nativeElement).find('div.modal');
  }

  ngOnInit() {
  }

}
