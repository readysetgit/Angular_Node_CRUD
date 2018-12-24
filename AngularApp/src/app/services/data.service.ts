import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { employeeModel } from '../models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firstTempEmployee:employeeModel = new employeeModel()
  private dataSource = new BehaviorSubject(this.firstTempEmployee);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: employeeModel){
    this.dataSource.next(data)
  }
}
