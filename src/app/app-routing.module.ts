import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BattleGroundComponent } from './battle-ground/battle-ground.component';
import { OneVsAllComponent } from './home/one-vs-all/one-vs-all.component';
import { AllVsAllComponent } from './home/all-vs-all/all-vs-all.component';
import { BattleGroundTwoComponent } from './battle-ground-two/battle-ground-two.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    children:[
      {
        path:'',
        component:OneVsAllComponent
      },
      {
        path:'all-vs-all',
        component:AllVsAllComponent
      }
    ]
  },
  {
    path:"battle",
    component: BattleGroundComponent
  },
  {
    path:"battle2",
    component: BattleGroundTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
