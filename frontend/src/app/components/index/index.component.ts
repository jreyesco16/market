import { Component, Input, NgModule, OnInit, Output } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import {authenticate, Fetch} from '../../Utils/Authentication'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    const token = this.cookieService.get("market-token")

    if(token === "") return

    const user = authenticate(token)

    if(user !== null) this.router.navigate(['/dashboard'])
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

        const data = await Fetch(url, "POST", headers, body)
        const token = data['market-token']

        if (token !== "") {
            this.cookieService.set('market-token', data['market-token'])
            this.router.navigate(['/dashboard'])
            return
        }
        
        alert("Failure to log in")
  }

  public signup(){
    location.replace("/signup")
}

}
