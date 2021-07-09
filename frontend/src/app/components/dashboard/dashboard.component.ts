import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { authenticate, Fetch} from 'src/app/Utils/Authentication';
import {User} from "../../Utils/Authentication"
import { Request } from './requests/request-item/request-item.component'
import {Feedback} from './feedback/feedback-item/feedback-item.component'
interface Dashboard {
  requests : Request []
  feedback : Feedback []
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  title = "dashboard"

  user: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  }

  dashboard : Dashboard = {requests: [], feedback: []}

  constructor(private cookieService: CookieService, private router: Router,) { }

  ngOnInit(): void {
    const token = this.cookieService.get("market-token")

    if(token === "") this.router.navigate(['/'])

    this.user = authenticate(token)

    this.getDashboard(this.user)
  }

  getDashboard = async (user: User) => {
    const url = "http://localhost:8000/dashboard"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({user: user})

    const res = await Fetch(url, "POST", headers, body)

    this.dashboard = res['dashboard']    
  }

  goToSettings = () => {
    this.router.navigate(["/settings"])
  }

  getRatingConfig = (num : number) => {
    const rating = String(num)
    if(num >= 4.5){
        return rating.fontcolor("green")
    }else if(num >= 4.0){
        return rating.fontcolor("yellowgreen")
    }else if(num >= 3.5){
        return rating.fontcolor("#CDD704")
    }else if(num >= 3.0){
        return rating.fontcolor("gold")
    }else if(num >= 2.5){
        return rating.fontcolor("darkorange")
    }else{
        return rating.fontcolor("red")
    }
  }

}
