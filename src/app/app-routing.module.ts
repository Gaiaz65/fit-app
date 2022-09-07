import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
import { StartPageComponent } from './start-page/start-page.component';
import {  Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  // {
  //   path: 'training',
  //   loadChildren: () =>
  //     import('src/app/training/training.module').then((m) => m.TrainingModule),
  // },
  {
    path: 'training',
    component: TrainingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
