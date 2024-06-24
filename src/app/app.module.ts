import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StatusComponent } from './components/status/status.component';
import { BaptismComponent } from './components/baptism/baptism.component';
import { HeaderComponent } from './components/header/header.component';
import { ChurchesComponent } from './components/churches/churches.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeopleComponent } from './components/people/people.component';
import { ListComponent } from './components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const appRout:Routes=[
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"status",component:StatusComponent},
  {path:"babtism",component:BaptismComponent},
  {path:"people",component:PeopleComponent},
  {path:"churches",component:ChurchesComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StatusComponent,
    BaptismComponent,
    HeaderComponent,
    ChurchesComponent,
    PeopleComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRout),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
