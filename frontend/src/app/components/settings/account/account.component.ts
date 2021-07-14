import { Component, OnInit, Input } from '@angular/core'
import { Fetch } from 'src/app/Utils/Authentication'
import { User } from "../../../Utils/Authentication"
import heic2any  from "heic2any"

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  @Input() user: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: ""
  }

  firstName: string = ""
  lastName: string = ""
  avatar : any = ""

  constructor() { }

  ngOnInit(): void {
    this.firstName = this.user.firstName
    this.lastName = this.user.lastName
    this.avatar = this.user.avatar
  }

  public handleFirstNameChange = (firstName : string ) => {
    console.log("First Name", firstName)
    this.firstName = firstName
  }
  
  public handleLastNameChange = (lastName : string ) => {
    this.lastName = lastName
  }

  handleAccountChange = async () => {

    // also save new avatar

    const url = "http://localhost:8000/settings/account"
    const body = JSON.stringify({first_name : this.firstName, last_name : this.lastName})
    const headers = {"Content-Type" : "application/json; charset=utf-8"}

    const res = await Fetch(url, "POST", headers, body)

    res ? location.replace("/settings") : location.replace("/")
  }

  // have to come back to this
  processAvatar = async (image : any) => {
    let file = image.files[0]

    const reader = new FileReader()

    // * DONT DISCARD *//
    try {
        if(file['type'] == "image/heic"){
            const URL = await window.URL.createObjectURL(file)
            const res = await fetch(URL)
            const blob = await res.blob()
            const pngBlob = await heic2any({blob, toType: "image/png", multiple: true,})
        }
        reader.readAsDataURL(file)

        reader.onload = () => {
            this.avatar = reader.result
        }
    } catch(error) {
        console.log(error)
    }

    console.log("Uploading new image")
  }

}
