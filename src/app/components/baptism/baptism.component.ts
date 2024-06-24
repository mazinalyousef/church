import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-baptism',
  templateUrl: './baptism.component.html',
  styleUrls: ['./baptism.component.css']
})
export class BaptismComponent {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;

  constructor(private resolver:ComponentFactoryResolver) {}
  reactiveForm:FormGroup;

  toggleDropdown() {
    if (this.dropdownRef) {
      this.dropdownRef.destroy();
      this.dropdownRef = null;
    } else {
      const factory = this.resolver.resolveComponentFactory(ListComponent);
      this.dropdownRef = this.container.createComponent(factory);
    }
  }
  ngOnInit(){
    this. reactiveForm=new FormGroup({
     Kname:new FormControl("",Validators.required),
    number:new FormControl("",Validators.required),
    churche:new FormControl("",Validators.required),
     name:new FormControl("",Validators.required),
     neckName:new FormControl("",Validators.required),
     churcheName:new FormControl("",Validators.required),
     fathertName:new FormControl("",Validators.required),
    motherName:new FormControl("",Validators.required),
    nationalNumber:new FormControl("",Validators.required),

    Qnumber:new FormControl("",Validators.required),

    date:new FormControl("",Validators.required),

   bornPlace:new FormControl("",Validators.required),
   bornDate:new FormControl("",Validators.required),
   priestName:new FormControl("",Validators.required),
   placeBaptism:new FormControl("",Validators.required),


   godfather:new FormControl("",Validators.required),
   godmother:new FormControl("",Validators.required),
   ratification:new FormControl("",Validators.required),
   releaseDate:new FormControl("",Validators.required),

    })

  }
  onSubmit(form:NgForm){
    console.log(form);
  }
}

