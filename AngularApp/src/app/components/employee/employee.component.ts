import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { employeeModel } from 'src/app/models/employeeModel';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  employeeList: employeeModel[] 
  employee:employeeModel=new employeeModel()
  
  constructor(private empService:EmployeeServiceService, private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.currentData.subscribe(data => console.log('Subscription at Parent/Brother',data))
      // this.employeeList.Name = data['Name']
      // this.employeeList.
    this.getEmployees()
  }

  getEmployees(){
    this.empService.getEmployees().subscribe((data)=>{
      console.log(data)
      this.employeeList =  data
    })  
  }

  updateUser(x){
    
    
    this.dataService.changeData(x)
    this.router.navigate(['/createuser']);
    // this.empService.updateEmployee(x).subscribe((data)=>{
    //   this.getEmployees()
    // })
  }


  deleteUser(x){
    this.empService.deleteEmployee(x).subscribe((data)=>{
      this.getEmployees()
      // alert(data['Action'])
    })
  }

  createUser(){
    let emptyEMP = new employeeModel()
    console.log('THIS IS EMPTY',emptyEMP)
    this.dataService.changeData(emptyEMP)
    this.router.navigate(['/createuser']);  
  }
}
