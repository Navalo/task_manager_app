import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './pages/tastk-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

const routes: Routes = [
  {path:'', component:  TaskListComponent},
  {path:'create', component:  TaskFormComponent},
  {path:'edit/:id', component:  TaskFormComponent},
  {path:'details/:id', component:  TaskFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
