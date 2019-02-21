import {inject, reset} from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";

import {ContactCreated} from './messages'
import {ContactService} from '../services/services';

import { Router } from 'aurelia-router';

@inject(EventAggregator, ContactService, Router)
export class ContactCreate {
  private _contactService;
  private _ea;
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  router: Router;

  constructor(ea: EventAggregator, contactService: ContactService, router: Router) {
    this._contactService = contactService;
    this._ea = ea;
    this.router = router;
  }

  create() {
    let contact = JSON.parse(JSON.stringify(this.contact));
    
    if(contact.email === "") {
      return alert("You need to add information to your contact.");
    } else {
      this._contactService.createContact(contact)
      .then(contact => {
          this._ea.publish(new ContactCreated(contact));
      }).catch(err => console.log(err));
    this.router.navigateToRoute('contacts');
    }
  }
  
  reset() {
    window.history.back();
  }
}