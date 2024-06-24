import { Component ,OnInit,ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { Router } from '@angular/router';

;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;

  constructor(private ser:ServicesService,private router:Router){}


reactiveFormLogin:FormGroup;


ngOnInit() {
  this.reactiveFormLogin=new FormGroup({
    username:new FormControl(null,Validators.required),
   password:new FormControl(null,Validators.required)

  })

}
onSubmit(form:NgForm){
  console.log(form);
}
loadComponent() {
  this.router.navigate(['/home']);
}
 handleSubmit = (e:any) => {
  e.preventDefault();

}
}
