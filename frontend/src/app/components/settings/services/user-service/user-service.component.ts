import { Component, Input, OnInit } from '@angular/core';
import { Service } from "../services.component"

export interface UserService {
  id : number
  fee : number
  duration : number
  rating : number
  serviceID : number
  service : number
}

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.sass']
})
export class ServiceItemComponent implements OnInit {

  @Input() userService: UserService = {id: 0, fee : 0 ,duration : 0,rating : 0,serviceID : 0,service : 0}

  constructor() { }

  ngOnInit(): void {

    
  }

}
