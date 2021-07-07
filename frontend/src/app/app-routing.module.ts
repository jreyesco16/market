import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {IndexComponent} from './components/index/index.component'
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "", component: IndexComponent},
  { path: "signup", component: SignupComponent},
  { path: "dashboard", component: DashboardComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
