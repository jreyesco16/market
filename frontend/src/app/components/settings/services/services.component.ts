import { Component, OnInit } from '@angular/core';
import { authenticate, Fetch} from 'src/app/Utils/Authentication';
import { CookieService } from 'ngx-cookie-service'
import {User} from "../../../Utils/Authentication"
import { UserService } from "./user-service/user-service.component"

export interface Service {
  id: number
  service: string
}

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

  services: Service[] = []

  userServices: UserService[] = []

  constructor(private cookieService: CookieService,) { }

  ngOnInit(): void {

    this.FetchServices()
    this.FetchUserServices()
  }

  FetchUserServices = async () => {

    const token = this.cookieService.get("market-token")

    const url = "http://localhost:8000/settings/userservices"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({ token : token })

    const res = await Fetch(url, "POST", headers, body)
    const userServices: UserService[] = res.UserServices
    this.userServices = userServices
  }

  FetchServices= async () => {

    const token = this.cookieService.get("market-token")

    const url = "http://localhost:8000/settings/services"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({token : token})
    
    const res = await Fetch(url, "POST", headers, body)
    const services: Service[] = res.Services
    this.services = services
  }

}
