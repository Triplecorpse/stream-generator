import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {IPersonForm} from "./i-person-form";
import {IPersonEditableOptions} from "./i-person-editable-options";

@Injectable()
export class DataService {

  private api = {
    person: '/person',
    buzz: '/buzz',
    getManifest: '/manifest.json',
    setManifest: '/manifest',
    manifestSchema: '/manifest-schema.json',
    receipt: '/receipt',
    externalInput: '/external'
  };

  constructor(public http: Http) {
  }

  addPerson(options: IPersonForm, qty: number) {
    let search: URLSearchParams = new URLSearchParams();

    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        search.set(option, options[option]);
      }
    }

    search.set('qty', qty.toString());

    return this.http.get(this.api.person + '/add', {search});
  }

  removePerson(id: string) {
    let search: URLSearchParams = new URLSearchParams();

    search.set('id', id);

    return this.http.get(this.api.person + '/remove', {search});
  }

  getManifestSchema() {
    return this.http.get(this.api.manifestSchema);
  }

  getManifest() {
    return this.http.get(this.api.getManifest);
  }

  setManifest(manifest) {
    return this.http.post(this.api.setManifest, {manifest});
  }

  editPerson(id: string, person: IPersonEditableOptions) {
    let search: URLSearchParams = new URLSearchParams();

    for (let prop in person) {
      if (person.hasOwnProperty(prop)) {
        search.set(prop, person[prop]);
      }
    }

    search.set('id', id);

    return this.http.get(this.api.person + '/edit', {search});
  }

  buzz() {
    return this.http.get(this.api.buzz);
  }

  getReceipt() {
    return this.http.get(this.api.receipt);
  }

  stairEvent(stairId: number, key: string) {
    return this.http.get(`${this.api.externalInput}/stair/${stairId}/${key}`);
  }
}
