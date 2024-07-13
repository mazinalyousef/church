import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { person } from '../_models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  add(item:person) : Observable<number>
  {
     return this.http.post<number>(this.baseUrl+'Person',item);
  }
  update(id:number, item:person) : Observable<boolean>
  {
     return this.http.put<boolean>(this.baseUrl+'Person/'+id,item);
  }
  delete(id:number)  
  {
     return this.http.delete(this.baseUrl+'Person/'+id);
  }
  getbynationalNumber(nid:string):Observable<person>
  {
     return this.http.get<person>(this.baseUrl+'Person/ByNationalId/'+nid);
  }
  get(id:Number):Observable<person>
  {
   return this.http.get<person>(this.baseUrl+'Person/'+id);
  }
  getAll():Observable<person[]>
  {
   return this.http.get<person[]>(this.baseUrl+'Person');
  }
  search(nameVal:string,nidVal:string,returnedRecordsVal?:number):Observable<person[]>
  {
   if (!returnedRecordsVal)
   {
      returnedRecordsVal=100;
   }
   let searchParam = { name: nameVal,nid:nidVal,returnedRecords:returnedRecordsVal }
   return this.http.get<person[]>(this.baseUrl+'Person/Search',{params:searchParam});
  }


}
