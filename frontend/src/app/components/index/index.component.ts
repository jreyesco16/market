import { Component, Input, NgModule, OnInit, Output } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import {Fetch} from '../../Utils/Authentication'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    const marketToken = this.cookieService.get("market-token")

    if(marketToken) this.router.navigate(['/dashboard'])
  }

  public title = "Market"

  email: string | null = null
  public handleEmailChange = (email: string) => {
    this.email = email
  }

  password: string | null = null
  public handlePasswordChange = (password: string) => {
    this.password = password
  }

  public login = async () => {
    const headers = {"Content-Type" : "application/json; charset=utf-8"}
    const body = JSON.stringify({ email: this.email, password: this.password})
    const url = "http://localhost:8000/login"

    try {   
        const data = await Fetch(url, "POST", headers, body)

        if (data["market-token"]) {
            this.cookieService.set('market-token', data['token'])
            this.router.navigate(['/dashboard'])
            return
        }

        throw Error

    } catch(Error) {
      alert("Failure to login")
    }
  }

  public signup(){
    location.replace("/signup")
}

}
