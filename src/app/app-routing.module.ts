import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeServiceComponent } from './components/bike-service/bike-service.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { CompletedServicesComponent } from './components/completed-services/completed-services.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { MechanicsComponent } from './components/mechanics/mechanics.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: BikeServiceComponent ,canActivate: [AuthGuard]},
  { path: 'completed', component: CompletedServicesComponent ,canActivate: [AuthGuard]},
  { path: 'expense', component: ExpensesComponent ,canActivate: [AuthGuard]},
  { path: 'mechanics', component: MechanicsComponent ,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
