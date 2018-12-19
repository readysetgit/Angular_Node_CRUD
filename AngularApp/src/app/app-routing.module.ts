import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  { path: 'createuser', component: CreateuserComponent },
  { path: 'home', component: EmployeeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
