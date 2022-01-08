import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home/home.component';
import { BattleGroundComponent } from './battle-ground/battle-ground.component';
import { HeaderComponent } from './home/header/header.component';
import { OneVsAllComponent } from './home/one-vs-all/one-vs-all.component';
import { AllVsAllComponent } from './home/all-vs-all/all-vs-all.component';
import { CommaPipe } from './shared/comma.pipe';
import { RouterModule } from '@angular/router';
import { BattleGroundTwoComponent } from './battle-ground-two/battle-ground-two.component';
import { ChartsModule } from 'ng2-charts'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BattleGroundComponent,
    HeaderComponent,
    OneVsAllComponent,
    AllVsAllComponent,
    CommaPipe,
    BattleGroundTwoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
