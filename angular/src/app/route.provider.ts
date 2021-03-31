import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      // {
      //   path: '/Matches',
      //   name: '::Menu:MatchAdmin',
      //   iconClass: 'fas fa-book',
      //   order: 2,
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: '/Match',
      //   name: '::Menu:Matches',
      //   iconClass: 'fas fa-book',
      //   order: 2,
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: '/Match/MatchData',
      //   name: '::Menu:MatchData',
      //   iconClass: 'fas fa-book',
      //   order: 2,
      //   parentName: '::Menu:MatchAdmin',
      //   layout: eLayoutType.application,
      // },
      // {
      //   path: '/schedules',
      //   name: '::Menu:Schedules',
      //   iconClass: 'fas fa-book',
      //   order: 3,
      //   layout: eLayoutType.application,
      //   // requiredPolicy: 'Matches.Schedules',
      // },
    ]);
  };
}
