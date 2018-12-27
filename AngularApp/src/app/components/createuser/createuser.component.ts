import { Component, OnInit } from '@angular/core';
import { employeeModel } from 'src/app/models/employeeModel';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  
  updateFlag = false 
  Namee=''
  Addresss=''
  Mobilee=''
  employee:employeeModel=new employeeModel()

  constructor(private empService:EmployeeServiceService,
              private dataService: DataService,
              private router:Router) { }

  ngOnInit() {
    this.dataService.currentData.subscribe((data)=>{
      console.log('Create User Subscribed',data)
      this.employee = data

      if (this.employee.Name != '')
        this.updateFlag = true
      else
        this.updateFlag = false

      this.Namee = this.employee.Name
      this.Addresss = this.employee.Address
      this.Mobilee = this.employee.Mobile
      console.log('This is the Name', this.Namee)    
    })

    
  }

  createUser(){
    this.employee.Name=this.Namee
    console.log(this.employee.Name)
    this.employee.Address=this.Addresss
    this.employee.Mobile=this.Mobilee

    if (!this.updateFlag){
      this.empService.createEmployee(this.employee).subscribe((data)=>{
        // alert(data['Action'])
        this.router.navigate(['/home']);
      })
    }
    else{
      this.empService.updateEmployee(this.employee).subscribe((data)=>{
        // alert(data['Action'])
        this.router.navigate(['/home']);
      })
    }
    
  }
  
}

