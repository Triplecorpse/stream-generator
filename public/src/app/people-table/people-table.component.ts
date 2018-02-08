import {Component, Input} from '@angular/core';
import {IPersonUpdate} from "../i-person-update";
import {DataService} from "../data.service";
import {IPersonEditableOptions} from "../i-person-editable-options";

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent {
  @Input() people: IPersonUpdate[];

  constructor(public dataService: DataService) {

  }
}
