import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {MoneylistEntry} from "../model/moneylistEntry";
import { FindAll } from './findAll';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoneylistService implements FindAll<MoneylistEntry>{
  private readonly baseUrl = 'http://schulbuch.rathgeb.at/moneylist';
  constructor(private _http: HttpClient, private userService: UserService) { }

  update(id: number, data: MoneylistEntry): Observable<MoneylistEntry> {
    return this._http.put<MoneylistEntry>(`${this.baseUrl}/update/${id}`, data, {headers: this.userService.getAuthorizationHeader()});
  }

  public delete(key: any): Observable<MoneylistEntry> {
    alert("Deleting item with id: " + key)
    return this._http.delete<MoneylistEntry>(this.baseUrl + "/delete" + "/" + key, {headers: this.userService.getAuthorizationHeader()})
      .pipe(
        catchError(err => {
          console.error('Error deleting item:', err);
          throw err;
        })
      );
  }
  public findAll(): Observable<MoneylistEntry[]> {
    return this._http.get<MoneylistEntry[]>(this.baseUrl, {headers: this.userService.getAuthorizationHeader()});
  }
}
