import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolClass} from "../model/schoolclass";
import {catchError, Observable} from "rxjs";
import { FindAll } from './findAll';
import { UserService } from './user.service';
import {MoneylistEntry} from "../model/moneylistEntry";

@Injectable({
  providedIn: 'root'
})
export class SchoolclassService implements FindAll<SchoolClass>{
  private readonly baseUrl = 'http://schulbuch.rathgeb.at/schoolclass';
  constructor(private _http: HttpClient, private userService: UserService) { }

  update(id: number, data: SchoolClass): Observable<SchoolClass> {
    return this._http.put<SchoolClass>(`${this.baseUrl}/update/${id}`, data, {headers: this.userService.getAuthorizationHeader()});
  }


  public delete(key: any): Observable<SchoolClass> {
    alert("Deleting item with id: " + key)
    return this._http.delete<SchoolClass>(this.baseUrl + "/delete" + "/" + key, {headers: this.userService.getAuthorizationHeader()})
      .pipe(
        catchError(err => {
          console.error('Error deleting item:', err);
          throw err;
        })
      );
  }

  public findAll(): Observable<SchoolClass[]> {
    return this._http.get<SchoolClass[]>(this.baseUrl, {headers: this.userService.getAuthorizationHeader()});
  }

  public findOneById(id: number): Observable<SchoolClass> {
    let idUrl = `${this.baseUrl}/${id}`;
    return this._http.get<SchoolClass>(idUrl);
  }
}
