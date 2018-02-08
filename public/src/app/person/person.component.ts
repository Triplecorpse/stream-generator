import {Component, Input} from '@angular/core';
import {IPersonUpdate} from "../i-person-update";
import {DataService} from "../data.service";
import {IPersonEditableOptions} from "../i-person-editable-options";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() person: IPersonUpdate;

  constructor(public dataService: DataService) {
  }

  public removePerson(id: string) {
    this.dataService.removePerson(id)
      .subscribe();
  }

  public editPerson(properties: any, person: IPersonUpdate) {
    const newValues: IPersonEditableOptions = {};

    for (let key in properties) {
      if (properties.hasOwnProperty(key)) {
        newValues[key] = properties[key];
      }
    }

    this.dataService.editPerson(person.person_id, newValues).subscribe();
  }
}
