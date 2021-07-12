import { Component, OnInit } from '@angular/core';
import { authenticate, Fetch} from 'src/app/Utils/Authentication';
import {User} from "../../../Utils/Authentication"

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {

  user: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

  FetchUserServices = async () => {

    const url = "http://localhost:8000/settings/userservices"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({ })

    const res = await Fetch(url, "POST", headers, body)
    const user_services = res.UserServices

    return user_services
  }

  FetchServices= async () => {

    const url = "http://localhost:8000/settings/services"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({})
    
    const res = await Fetch(url, "POST", headers, body)
    const services = res.Services

    return services
  }

}
