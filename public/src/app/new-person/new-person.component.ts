import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ViewerDetectionOutputService} from "../viewer-detection-output.service";
import {IPersonForm} from "../i-person-form";

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit {
  public buzzerStatus: string = 'Didn\'t buzzzzed yet';
  public qty = 1;

  constructor(public dataService: DataService, public viewerDetectionOutput: ViewerDetectionOutputService) {
    viewerDetectionOutput.buzzer.subscribe(data => {
      this.buzzerStatus = 'Last buzzzz on ' + new Date();
    });
  }

  submitPersons(personForm: IPersonForm) : void {
    for (let i = 0; i < this.qty; i++) {
      personForm.ageValue = this.randomizeAge(personForm.ageMinValue, personForm.ageMaxValue);

      if (personForm.gender === 'random') {
        personForm.gender = this.randomizeGender();
      }

      this.dataService.addPerson(personForm, 1).subscribe();
    }
  }

  randomizeAge(minValue, maxValue) {
    const ceil = maxValue - minValue;
    return Math.random() * ceil + minValue;
  }

  randomizeGender() {
    const decider = Math.random() < 0.5;

    if (decider) {
      return 'male'
    } else {
      return 'female'
    }
  }

  ngOnInit() {
  }

}
