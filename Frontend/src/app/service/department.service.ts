import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../model/department";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements FindAll<Department>{
  private readonly baseUrl = '../departments';

  constructor(private _http: HttpClient) { }

  public findAll(): Observable<Department[]> {
    return this._http.get<Department[]>(this.baseUrl);
  }

  public findOneById(id: number): Observable<Department> {
    let idUrl = `${this.baseUrl}/${id}`;
    return this._http.get<Department>(idUrl);
  }
}