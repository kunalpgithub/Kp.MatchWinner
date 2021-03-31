import { Component } from '@angular/core';
import { RoutesService } from '@abp/ng.core';
import { NavItemsService } from '@abp/ng.theme.shared';
import { eThemeSharedRouteNames } from '@abp/ng.theme.shared';
import { eThemeBasicComponents } from '@abp/ng.theme.basic';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  /**
   *
   */
  constructor(private navItems: NavItemsService, private routes: RoutesService) {
    // routes.remove(['::Menu:Home']);
    // routes.remove([eThemeSharedRouteNames.Administration, '::Language', '::Account:Login']);
    // super();
    this.navItems.removeItem(eThemeBasicComponents.Languages);
    this.navItems.removeItem(eThemeBasicComponents.CurrentUser);
  }
}
