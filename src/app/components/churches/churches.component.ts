import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.css']
})
export class ChurchesComponent {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;

  constructor(private resolver:ComponentFactoryResolver) {}
  churchesReactiveForm:FormGroup;
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
    this.  churchesReactiveForm=new FormGroup({
      churchesName:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),

})}
onSubmit(form:NgForm){
  console.log(form);
}}

