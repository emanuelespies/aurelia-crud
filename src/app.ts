import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router | undefined;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia CRUD';
    config.map([{
      route: [ '', 'home' ],
      name: 'home',
      moduleId: PLATFORM.moduleName('./home/home'),
      title: 'Home'
    }, {
      route: 'contacts-list',
      name: 'contacts',
      moduleId: PLATFORM.moduleName('./contacts/contacts'),
      title: 'Contact List'
    }, {
      route: 'contacts-list/:id',
      name: 'ContactDetail',
      moduleId: PLATFORM.moduleName('./contacts/ContactDetail')
    }, {
      route: 'contacts-list/create',
      name: 'ContactCreate',
      moduleId: PLATFORM.moduleName('./contacts/ContactCreate')
    }]);

    this.router = router;
  }
}
