import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { authenticate, Fetch} from 'src/app/Utils/Authentication';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import {User} from "../../Utils/Authentication"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  faTimes = faTimes

  user: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  }

  display: string  = "none"

  constructor(private cookieService: CookieService, private router: Router, ) { }

  ngOnInit(): void {
    const token = this.cookieService.get("market-token")

    if(token === "") this.router.navigate(['/'])

    this.user = authenticate(token)

    console.log("USER ", this.user)
  }

  closePopup = () => {
    this.display = "none"
    console.log("Closing pop up")
  }

  editAccount = () => {
    this.display = "block"
    console.log(("Editing account"))
  }

  editServices = () => {
    this.display = "block"
    console.log("Editing services")
  }

  viewHistory = () => {
    this.display = "block"
    console.log("Viewing History")
  }

  viewActivity = () => {
    this.display = "block"
    console.log("Viewing Activity")
  }

  viewRules = () => {
    this.display = "block"
    console.log("Viewing rules")
  }

  openContactUs = () => {
    this.display = "block"
    console.log("Contacting us")
  }

}
