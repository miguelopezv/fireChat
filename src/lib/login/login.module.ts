import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: fromContainers.LoginLayoutComponent }
];

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LoginModule {}
