import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './utils/auth.guard';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent, },
    { path: 'edit-project/:id', component: ProjectEditComponent, },
    { path: 'createProject', component: CreateProjectComponent, },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

// canActivate: [authGuard]