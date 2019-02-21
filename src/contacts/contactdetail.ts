import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'

import {ContactService} from "../services/services";
import {ContactUpdated, ContactViewed} from './messages'
import {areEqual} from './utility';

import { Router } from 'aurelia-router';

@inject(EventAggregator, ContactService, Router)
export class ContactDetail {
  private _contactService: ContactService;
  event : any;
  router: Router;
  routeConfig : any;
  activeContact : any;
  originalContact : {};

  constructor(eventAggregator, contactService: ContactService) {
    this.event = eventAggregator;
    this._contactService = contactService;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    return this._contactService.getContact(params.id)
      .then(contact => {
        this.activeContact = contact;
        this.routeConfig.navModel.setTitle(this.activeContact.firstName);
        this.originalContact = contact;
        this.event.publish(new ContactViewed(this.activeContact));
      });
    }

  get canSave() {
    return this.activeContact.firstName && this.activeContact.lastName;
  }
  
  save() {
    this._contactService.updateClient(this.activeContact.id, this.activeContact).then(contact => {
      this.activeContact = contact
      this.routeConfig.navModel.setTitle(this.activeContact.firstName);
      this.originalContact = contact;
      this.event.publish(new ContactUpdated(this.activeContact));
      window.history.back();
    });
  }

  canDeactivate() {
    if(!areEqual(this.originalContact, this.activeContact)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      if(!result) {
        this.event.publish(new ContactViewed(this.activeContact));
      }
      return result;
    }
    return true;
  }
}