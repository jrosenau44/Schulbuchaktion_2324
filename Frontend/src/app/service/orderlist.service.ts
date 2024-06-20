import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import { BookOrder } from '../model/bookOrder';
import { FindAll } from './findAll';
import { UserService } from './user.service';
import {MoneylistEntry} from "../model/moneylistEntry";

@Injectable({
  providedIn: 'root'
})
export class OrderlistService implements FindAll<BookOrder> {
  private readonly baseUrl = 'http://schulbuch.rathgeb.at/orderlist';
  constructor(private _http: HttpClient, private userService: UserService) { }

  update(id: number, data: BookOrder): Observable<BookOrder> {
    return this._http.put<BookOrder>(`${this.baseUrl}/update/${id}`, data, {headers: this.userService.getAuthorizationHeader()});
  }
  public addOrder(data: BookOrder): Observable<BookOrder> {
    return this._http.post<BookOrder>(`${this.baseUrl}/write`, data, {headers: this.userService.getAuthorizationHeader()});
  }

  public findAll(): Observable<BookOrder[]> {
    return this._http.get<BookOrder[]>(this.baseUrl, {headers: this.userService.getAuthorizationHeader()});
  }




  public delete(key: any): Observable<BookOrder> {
    alert("Key: " + key.id);

    return this._http.delete(this.baseUrl + "/delete" + "/" + key.id, {headers: this.userService.getAuthorizationHeader()});

  }
}
