import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    ...canActivate(redirectUnauthorizedTo(['login'])),
    loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'login',
    ...canActivate(redirectLoggedInTo([''])),
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
