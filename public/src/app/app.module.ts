import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {ViewerDetectionService} from './viewer-detection.service';
import {ViewerDetectionOutputService} from './viewer-detection-output.service';

import {PersonComponent} from './person/person.component';
import {DataService} from "./data.service";
import {PeopleTableComponent} from './people-table/people-table.component';
import { PrintInfoComponent } from './print-info/print-info.component';
import { ExternalInputComponent } from './external-input/external-input.component';
import { NewPersonComponent } from './new-person/new-person.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    PeopleTableComponent,
    PrintInfoComponent,
    ExternalInputComponent,
    NewPersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ViewerDetectionService, ViewerDetectionOutputService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
