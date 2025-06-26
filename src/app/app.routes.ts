import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ModelsComponent } from './components/models/models.component';
import { ArViewerComponent } from './components/ar-viewer/ar-viewer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GlbViewerComponent } from './components/glb-viewer/glb-viewer.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'ar-viewer', component: ArViewerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'glb-viewer', component: GlbViewerComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
