import {Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'app-print-info',
  templateUrl: './print-info.component.html',
  styleUrls: ['./print-info.component.scss']
})
export class PrintInfoComponent implements OnInit {
  @Input() src: string;

  constructor(private _rootNode: ElementRef) { }

  ngOnInit() {
  }

}
