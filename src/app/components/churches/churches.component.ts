import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { church } from 'src/app/_models/church';
import { ChurchService } from 'src/app/_services/church.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.css']
})
export class ChurchesComponent {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;
  form:FormGroup;
  _church:church;




  constructor(private resolver:ComponentFactoryResolver,private _service:ChurchService) {}



 

  
  ngOnInit()
  {
    this.  form=new FormGroup({
      name:new FormControl('',Validators.required),
      adress:new FormControl(''),

});
this.onnew();
}

onnew()
{
   this._church={} as church;
   this._church.id=0;
   this._church.name="";
   this._church.adress="";
   this.form.patchValue(this._church);
}

onSubmit()
{

  if (this.form.invalid){
    alert("invalid form data"); 
    return;
  }
  this._church.name  = this.form.get("name")?.value;
  this._church.adress  = this.form.get("adress")?.value;

  this._service.addchurch(this._church).subscribe(
  
      res=>
      {
       alert("success"); 
       this.onnew();
      } ,
      error => {
        if(error instanceof HttpErrorResponse) {
           // Handle error
           alert("Status: "+ error.status +", Message: " + error.error);
        }
      }
    
          
  )
}}

