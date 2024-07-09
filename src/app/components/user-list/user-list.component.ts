import { Component, OnInit } from '@angular/core';
import { userForView } from 'src/app/_models/userForView';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit
 {

  usersforView:userForView[];

  constructor( private userService:UsersService
   )
  {   
  }




  ngOnInit(): void
  {
     this.userService.getUsers().subscribe(
      res=>
      {
          this.usersforView=res;
      }
      ,error=>
      {
        console.log("error get users "+error);
      }
     )
  }
  EditUser(id:string)
  {
    alert(id);
  }

}
