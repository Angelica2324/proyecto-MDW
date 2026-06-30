import { Routes } from '@angular/router';

import { Principal } from './componente/principal/principal';
import { Login } from './componente/login/login';
import { Registro } from './componente/registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },

  { path: 'principal', component: Principal },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro }
];