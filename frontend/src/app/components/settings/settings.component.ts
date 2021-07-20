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

  accountDisplay: string = "none"
  servicesDisplay : string = "none"
  historyDisplay : string = "none"
  activityDisplay : string = "none"
  rulesDisplay : string = "none"
  contactDisplay : string = "none"

  constructor(private cookieService: CookieService, private router: Router, ) { }

  ngOnInit(): void {
    const token = this.cookieService.get("market-token")

    if(token === "") this.router.navigate(['/'])

    this.user = authenticate(token)

    console.log("USER ", this.user)
  }

  closePopup = () => {
    this.display = "none"
    this.resetAll()
    console.log("Closing pop up")
  }

  editAccount = () => {
    this.display = "block"
    this.resetAll()
    this.accountDisplay = "block"
    console.log(("Editing account"))
  }

  editServices = () => {
    this.display = "block"
    this.resetAll()
    this.servicesDisplay = "block"
    console.log("Editing services")
  }

  viewHistory = () => {
    this.display = "block"
    this.resetAll()
    this.historyDisplay = "block"
    console.log("Viewing History")
  }

  viewActivity = () => {
    this.display = "block"
    this.resetAll()
    this.activityDisplay = "block"
    console.log("Viewing Activity")
  }

  viewRules = () => {
    this.display = "block"
    this.resetAll()
    this.rulesDisplay = "block"
    console.log("Viewing rules")
  }

  openContactUs = () => {
    this.display = "block"
    this.resetAll()
    this.contactDisplay = "block"
    console.log("Contacting us")
  }

  resetAll = () => {
    this.accountDisplay = "none"
    this.servicesDisplay = "none"
    this.historyDisplay = "none"
    this.activityDisplay = "none"
    this.rulesDisplay = "none"
    this.contactDisplay = "none"
  }

}
