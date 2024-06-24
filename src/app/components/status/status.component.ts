import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {

  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;

  constructor(private resolver:ComponentFactoryResolver) {}
  statusReactiveForm: FormGroup;
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
    this.statusReactiveForm=new FormGroup({
      /*
     Kname:new FormControl(null,Validators.required),
    number:new FormControl(null,Validators.required),
    churche:new FormControl(null,Validators.required),
     name:new FormControl(null,Validators.required),
     neckName:new FormControl(null,Validators.required),
     churcheName:new FormControl(null,Validators.required),
    fatherName:new FormControl(null,Validators.required),
    motherName:new FormControl(null,Validators.required),
    nationalNumber:new FormControl(null,Validators.required),
    place:new FormControl(null,Validators.required),
    Qnumber:new FormControl(null,Validators.required),
    mobileNumber:new FormControl(null,Validators.required),
   adress:new FormControl(null,Validators.required),
   bornPlace:new FormControl(null,Validators.required),
   bornDate:new FormControl(null,Validators.required),
   merit:new FormControl(null,Validators.required),
  emiteDate:new FormControl(null,Validators.required),
  complete:new FormControl(),


*/

    })

  }
  onSubmit(form:NgForm){
    console.log(form);
  }

}

