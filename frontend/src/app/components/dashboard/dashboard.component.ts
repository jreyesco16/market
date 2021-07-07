import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { authenticate } from 'src/app/Utils/Authentication';
import {User} from "../../Utils/Authentication"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  title = "dashboard"

  user: User | null = null

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    const token = this.cookieService.get("market-token")

    if(token === "") this.router.navigate(['/'])

    this.user = authenticate(token)
  }

  getDashboard = async () => {
                
    // const market_token = getMarketToken()
    const market_token = null

    const URL = "http://127.0.0.1:8000/dashboard"
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({token: market_token})

    const res = await fetch(URL, {
        method : "POST", 
        mode: "cors",
        headers : headers, 
        body : body
    })

    const dashboard_res = await res.json()
    const data = dashboard_res.dashboard

    /* INSERT DATA */
    // insertUserName(data.first_name, data.last_name)
    // insertRequests(data.request)
    // insertFeedback(data.feedback)
    // insertAvatar(data.avatar)
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
