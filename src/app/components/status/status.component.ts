import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { church } from 'src/app/_models/church';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/_services/data.service';
import { CertificateService } from 'src/app/_services/certificate.service';
import { PeopleService } from 'src/app/_services/people.service';
import { freeCertificate } from 'src/app/_models/freeCertificate';
import { person } from 'src/app/_models/person';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/_services/users.service';
import { ChurchService } from 'src/app/_services/church.service';
import { UserRoles } from 'src/app/_models/UserRoles';
import { DateHelperService } from 'src/app/_services/date-helper.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit
 {

  @ViewChild('dropdownContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  dropdownRef: ComponentRef<ListComponent>;
  _churches?:church[];
  private unsubscribe = new Subject<void>();
  form:FormGroup;
  _certificate :freeCertificate;
  loadedid:number;
  selectedid:number;
  selectedPerson?:person;
  certifiedisDisabled:boolean;
  DocumentIsLocked:boolean;
  UserChId:number;
  selectedChid?:number;

  constructor(private resolver:ComponentFactoryResolver,private certificateService :CertificateService,
    private dataService:DataService,private peopleService:PeopleService
    ,private userService:UsersService,
    private churchService:ChurchService,
    private datehelper :DateHelperService)
     {

     }



   onnew()
{
    this.loadedid=0;
    this.selectedid=0;

   this._certificate={} as freeCertificate;
   this.selectedPerson={} as person;

   this._certificate.id=0;
   this._certificate.number=0;
   this._certificate.dueDate=new Date();
   this._certificate.issuanceDate=new Date();
   this._certificate.certified=false;
   this._certificate.peID=0;
   this._certificate.per={} as person;
   this._certificate.per.firstName="";
   this._certificate.per.lastName="";
   this._certificate.per.nationalNumber="";
   this._certificate.per.fatherName="";
   this._certificate.per.motherName="";
   this._certificate.per.constraintPlace="";
   this._certificate.per.constraintNumber="";



   this.selectedPerson.firstName="";
   this.selectedPerson.lastName="";
   this.selectedPerson.nationalNumber="";
   this.selectedPerson.fatherName="";
   this.selectedPerson.motherName="";
   this.selectedPerson.constraintPlace="";
   this.selectedPerson.constraintNumber="";


   this.form.patchValue(this._certificate);
   this. DocumentIsLocked=false;
}
   
  ngOnInit(){

      // set certified is Disabled ....
      this.certifiedisDisabled=true;
      if (this.userService.CurrentloggedUser.roles)
     {
       if (this.userService.CurrentloggedUser.roles.includes(UserRoles.Bishop)
       ||this.userService.CurrentloggedUser.roles.includes(UserRoles.SystemAdmin))
       {
         this.certifiedisDisabled=false;
         }
      }
      this.UserChId=0;
      if (this.userService.CurrentloggedUser.chID)
      {
        this.UserChId = this.userService.CurrentloggedUser.chID;
      }


    this. form=new FormGroup({
      
      number: new FormControl("",Validators.required),
      dueDate: new FormControl(""),
      issuanceDate: new FormControl(""),
      certified:new FormControl({value:false,disabled:this.certifiedisDisabled}),
      chID: new FormControl("",Validators.required),
      peID: new FormControl(""),
      per: new FormGroup(
        {
          firstName: new FormControl(""),
          lastName: new FormControl(""),
          nationalNumber: new FormControl(""),
          fatherName: new FormControl(""),
          motherName: new FormControl(""),
          constraintPlace: new FormControl(""),
          constraintNumber: new FormControl("")
        }
      )
      });
       
       this.dataService.churchesforuser$.pipe(takeUntil(this.unsubscribe)).subscribe(data=>
        {
          this._churches=data;
        });
  
      this.onnew();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    }

   onSubmit() 
  {
    if (!this.form.valid)
    {
       alert ("Invalid Data");
        return
    }

    this._certificate.number  = +this.form.get("number")?.value;
    this._certificate.dueDate  = this.form.get("dueDate")?.value;

    this._certificate.dueDate = 
    new Date(this.datehelper.GetDateFromIsoString(this._certificate.dueDate))


    this._certificate.issuanceDate  = this.form.get("issuanceDate")?.value;

    this._certificate.issuanceDate = 
    new Date(this.datehelper.GetDateFromIsoString(this._certificate.issuanceDate))


    
    this._certificate.chID  = +this.form.get("chID")?.value;
   // this._certificate.peID  = +this.form.get("peID")?.value;
    this._certificate.peID=this.selectedid;
    this._certificate.certified  = this.form.get("certified")?.value;

      

     if (this.loadedid===0)
     {
      // insert 
            this.certificateService.add_free(this._certificate).subscribe(
        res=>
        {
          alert("inserted"+ res); this.onnew();
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
      this.certificateService.update_free(this.loadedid, this._certificate).subscribe(
        res=>
        {
          alert("updated.."+ res); this.onnew();
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
   
    if (!this.selectedChid)
    {
     alert("No Church Was Selected")
       return;
    }
    let userval= event.target.value;
    
   this.certificateService.getbyNumber_free(userval,this.selectedChid).subscribe(
    res=>
    {
      let cert=res;
      if (cert)
      {
        if (this._churches.some(x=>x.id=== cert.chID))
       {
        this._certificate=res;
        this.loadedid=this._certificate.id;
        this.selectedid =this._certificate.peID;
        
      this.form.patchValue(this._certificate);
       this.DocumentIsLocked = this._certificate.certified;
       }
       else
       {
          alert("invalid user request to load document");
       }
     
      }
     

    },error=>
    {
        alert(error);
    }
   )
  }


  onNationalIdBlur(event:any)
  {
    this.peopleService.getbynationalNumber(event.target.value).subscribe(
      res=>
      {
      this.selectedPerson=res;
      this.selectedid=this.selectedPerson.id;
      this._certificate.peID=this.selectedid;
          this.form.patchValue({per:this.selectedPerson});
      },error=>
      {
        this.selectedid=0;
        this._certificate.peID=this.selectedid;
        this.selectedPerson={} as person;
        this.selectedPerson.firstName="";
        this.selectedPerson.lastName="";
        this.selectedPerson.nationalNumber="";
        this.selectedPerson.fatherName="";
        this.selectedPerson.motherName="";
        this.selectedPerson.constraintPlace="";
        this.selectedPerson.constraintNumber="";
        this.form.patchValue({per:this.selectedPerson});

        alert("National Id Not Found");
        console.log("error getting national Id "+error)
      }
    );
  }
  



}

