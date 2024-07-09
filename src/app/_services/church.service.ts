import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { church } from '../_models/church';

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }


  addchurch(item:church) : Observable<number>
   {
      return this.http.post<number>(this.baseUrl+'Churches',item);
   }

   getChurches():Observable<church[]>
  {
     return this.http.get<church[]>(this.baseUrl+'Churches');
  }
  getChurchesforUser(userIdval:string):Observable<church[]>
  {
    let searchParam = { userId: userIdval }
     return this.http.get<church[]>(this.baseUrl+'Churches/foruser',{params:searchParam});
  }
}
