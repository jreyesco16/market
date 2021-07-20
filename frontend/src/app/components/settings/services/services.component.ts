import { Component, OnInit, NgModule } from '@angular/core'
import { Fetch } from 'src/app/Utils/Authentication'
import { CookieService } from 'ngx-cookie-service'
import {User} from "../../../Utils/Authentication"
import { UserService } from "./user-service/user-service.component"
import {  faPlus} from '@fortawesome/free-solid-svg-icons'

export interface Service {
  id: number
  service: string
}

export interface NewService {
  serviceId : number
  fee : number
  duration: number
  rating: number
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

  faPlus = faPlus

  constructor(private cookieService: CookieService,) { }

  ngOnInit(): void {

    this.FetchServices()
    this.FetchUserServices()
  }

  fee: number | null = null
  handleFeeChange = (fee : number) => {
    this.fee = fee
  }

  duration: number | null = null
  handleDurationChange = (duration: number) => {
    this.duration = duration
  }

  service: number | null = null
  handleServiceChange = (service : string) => {
    this.service = parseInt(service)
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
    const body = JSON.stringify({ token : token })
    
    const res = await Fetch(url, "POST", headers, body)
    const services: Service[] = res.Services
    this.services = services
  }

  addService = async () => {

    if( this.service === null || this.fee === null || this.duration === null) return

    const newService : NewService = {serviceId: this.service, fee: this.fee, duration: this.duration, rating: 0}

    const token = this.cookieService.get("market-token")

    const url = "http://localhost:8000/settings/new-service"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({ token : token, service: newService })

    const res = await Fetch(url, "POST", headers, body)

    console.log("res", res)


    console.log("New Service", newService)

    // USERSERVICE
    // id : number
    // fee : number
    // duration : number
    // rating : number
    // serviceID : number
    // service : number

    //NEWSERVIVE
    // serviceId : number
    // fee : number
    // duration: number
    // rating: number

    // ADD NEW SERVICE TO CURRENT USERSERVICES
    // this.userServices = [{...this.userServices, newService}]

    // only reset if the fetch is successful
    this.resetNewService()
  }

  resetNewService = () => {
    this.service = null
    this.fee = null
    this.duration = null
  }

}
