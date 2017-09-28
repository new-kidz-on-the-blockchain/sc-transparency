import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InputComponent} from './input/input.component';
import {ViewComponent} from './view/view.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: InputComponent
  },
  {
    path: 'view',
    component: ViewComponent
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
