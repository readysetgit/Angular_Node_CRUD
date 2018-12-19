import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { employeeModel } from '../models/employeeModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  getEmployeesURL: string = '/api/getEmployees'; 
  createEmployeeURL: string = '/api/createEmployee'; 
  updateEmployeeURL: string = '/api/updateEmployee'; 
  deleteEmployeeURL: string = '/api/deleteEmployee'; 


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { 
  }
   
  //GET EMPLOYEES
  getEmployees():Observable<employeeModel[]>{
    return this.http.get<employeeModel[]>(this.getEmployeesURL);
  }

  createEmployee(employee:employeeModel):Observable<any> {
    return this.http.post<employeeModel>(this.createEmployeeURL,employee,this.httpOptions)
  }

  deleteEmployee(employee:employeeModel):Observable<any> {
    return this.http.post<employeeModel>(this.deleteEmployeeURL,employee,this.httpOptions)
  }
  updateEmployee(employee:employeeModel):Observable<any> {
    return this.http.post<employeeModel>(this.updateEmployeeURL,employee,this.httpOptions)
  }

}
