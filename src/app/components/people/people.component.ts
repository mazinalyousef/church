import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { person } from 'src/app/_models/person';
import { PeopleService } from 'src/app/_services/people.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DateHelperService } from 'src/app/_services/date-helper.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;

  constructor(private resolver:ComponentFactoryResolver,
    private peopleservice :PeopleService,
    private datehelper:DateHelperService) {}
  form: FormGroup;
  _person : person;
  loadedid:number;



onnew()
{
    this.loadedid=0;
   this._person={} as person;
   this._person.firstName="";
   this._person.lastName="";
   this._person.nameInChurch="";
   this._person.nationalNumber="";
   this._person.fatherName="";
   this._person.motherName="";
   this._person.placeOfBirth="";
   this._person.birthDate=new Date();
   this._person.constraintPlace="";
   this._person.constraintNumber="";
   this._person.phon="";
   this._person.adress="";
   this._person.gender=true;
   this.form.patchValue(this._person);
}

  ngOnInit()
  
  {
      this.form=new FormGroup({
      firstName:new FormControl("",Validators.required),
      lastName:new FormControl(""),
      nameInChurch:new FormControl(""),
      nationalNumber:new FormControl("",Validators.required),
      fatherName:new FormControl(""),
      motherName:new FormControl(""),
      placeOfBirth:new FormControl(""),
      birthDate:new FormControl(""),
      constraintPlace:new FormControl(""),
      constraintNumber:new FormControl(""),
      phon:new FormControl(""),
      adress:new FormControl(""),
      gender:new FormControl("")
   
  });

   
  this.onnew();

}

  onSubmit() 
  {
    if (!this.form.valid)
    {
       alert ("Invalid Data");
        return
    }

    this._person.firstName  = this.form.get("firstName")?.value;
      this._person.lastName  = this.form.get("lastName")?.value;
      this._person.nameInChurch  = this.form.get("nameInChurch")?.value;
      this._person.nationalNumber  = this.form.get("nationalNumber")?.value;
      this._person.fatherName  = this.form.get("fatherName")?.value;
      this._person.motherName  = this.form.get("motherName")?.value;
      this._person.placeOfBirth  = this.form.get("placeOfBirth")?.value;
      this._person.birthDate  = this.form.get("birthDate")?.value;
      this._person.birthDate = new Date(this.datehelper.GetDateFromIsoString(this._person.birthDate))
      this._person.constraintPlace  = this.form.get("constraintPlace")?.value;
      this._person.constraintNumber  = this.form.get("constraintNumber")?.value;
      this._person.phon  = this.form.get("phon")?.value;
      this._person.adress  = this.form.get("adress")?.value;
      this._person.gender  = true; // to be modified later....
      var rdfemale= document.getElementById('Rdbtnfemale')as HTMLInputElement;
      if (rdfemale.checked)
      {
        this._person.gender  = false; 
      }

     if (this.loadedid===0)
     {
      // insert 
      
       
      this.peopleservice.add(this._person).subscribe(
        res=>
        {
          alert("inserted"+ res);
          this.onnew();
        },error=>
        {
          if(error instanceof HttpErrorResponse) {
            // Handle error
            alert("Status: "+ error.status +", Message: " + error.error);
         }
        }
      );
      
     }
     else 
     {
      this.peopleservice.update(this.loadedid, this._person).subscribe(
        res=>
        {
          alert("updated.."+ res);
          this.onnew();
        },error=>
        {
          if(error instanceof HttpErrorResponse) {
            // Handle error
            alert("Status: "+ error.status +", Message: " + error.error);
         }
        }
      );
     }
  }



  search(event)
  {
   

    let userval= event.target.value;
    //alert(userval);
   this.peopleservice.getbynationalNumber(userval).subscribe(
    res=>
    {
      this._person=res;
      this.loadedid=this._person.id;
      //handle the date 
     // birthdateiso: this._person.birthDate.toISOString().slice(0, 10);
      
    //  this._person.birthDate= new Date(this._person.birthDate?.toISOString().slice(0, 10));
    //  this._person.birthDate =new Date(this.GetDateFromIsoString(this._person.birthDate));
    //alert(this._person.birthDate);
      
    
    
    this.form.patchValue(this._person);
    if (this._person.gender)
    {
      // check the male 
      var rdmale= document.getElementById('Rdbtnmale')as HTMLInputElement;
      rdmale.checked=true;
    }
    else 
    {
      // check the female 
      var rdfemale= document.getElementById('Rdbtnfemale')as HTMLInputElement;
      rdfemale.checked=true;
    }

    },error=>
    {
        alert(error);
    }
   )
  }
  GetDateFromIsoString(_date:Date) :string
  {
    var d =new Date(_date);
    var ss=  new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    
    return ss;

  }

 
   


    }
