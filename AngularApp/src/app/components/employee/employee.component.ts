import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { employeeModel } from 'src/app/models/employeeModel';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  employeeList: employeeModel[] 
  employee:employeeModel=new employeeModel()
  
  constructor(private empService:EmployeeServiceService) { }

  ngOnInit() {
    
      // this.employeeList.Name = data['Name']
      // this.employeeList.
    this.empService.getEmployees().subscribe((data)=>{
      console.log(data)
      this.employeeList =  data
    })  
  }

  updateUser(x){
    this.empService.updateEmployee(x).subscribe((data)=>{
      alert(data['Action'])
    })
  }

  deleteUser(x){
    this.empService.deleteEmployee(x).subscribe((data)=>{
      alert(data['Action'])
    })
  }
}
