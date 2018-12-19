import { Component, OnInit } from '@angular/core';
import { employeeModel } from 'src/app/models/employeeModel';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  Namee=''
  Addresss=''
  Mobilee=''
  employee:employeeModel=new employeeModel()

  constructor(private empService:EmployeeServiceService) { }

  ngOnInit() {
  }

  createUser(){
    this.employee.Name=this.Namee
    console.log(this.employee.Name)
    this.employee.Address=this.Addresss
    this.employee.Mobile=this.Mobilee

    this.empService.createEmployee(this.employee).subscribe((data)=>{
      alert(data['Action'])
    })
  }
  
}

