import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ModelsComponent } from './components/models/models.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'models', component: ModelsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
