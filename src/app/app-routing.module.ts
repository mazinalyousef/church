import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BaptismComponent } from './components/baptism/baptism.component';
import { StatusComponent } from './components/status/status.component';
import { PeopleComponent } from './components/people/people.component';
import { ChurchesComponent } from './components/churches/churches.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './_guards/admin.guard';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes =
 [
 // {path:'login',component:LoginComponent,outlet:'mainrouter'},
//  {path:'header',component:HeaderComponent,outlet:'mainrouter'},

 {path:'login',component:LoginComponent},
   {path:'header',component:HeaderComponent,children:[
    {path:'baptism',component:BaptismComponent},
    {path:'home',component:HomeComponent},
    {path:'people',component:PeopleComponent},
    {path:'status',component:StatusComponent},
    {path:'church',component:ChurchesComponent,canActivate:[adminGuard]},
    {path:'users',component:UserListComponent,canActivate:[adminGuard]},
    {path:'users/:id',component:RegisterComponent,canActivate:[adminGuard]},
    {path:'userRegister',component:RegisterComponent,canActivate:[adminGuard]},
   ]},

  
   
   
 ,
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
