import { Component, OnInit } from '@angular/core'
import { Fetch } from 'src/app/Utils/Authentication'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleAccountChange = async () => {

    const first_name = ""
    const last_name = ""  
    const avatar = ""

    const url = "http://localhost:8000/settings/account"
    const body = JSON.stringify({first_name : first_name, last_name : last_name , avatar: avatar})
    const headers = {"Content-Type" : "application/json; charset=utf-8"}

    const res = await Fetch(url, "POST", headers, body)

    res ? location.replace("/settings") : location.replace("/")
  }

  displayNewAvatar = async (avatar_input: any, new_img: any) => {
    let file = avatar_input.files[0]

    const reader = new FileReader()

    // new_img.style.display="none"
    // document.getElementById("avatar-loader").style.display = "-webkit-inline-box"

    // * DONT DISCARD *//
    // try {
    //     if(file['type'] == "image/heic"){
    //         const URL = await window.URL.createObjectURL(file)
    //         const res = await fetch(URL)
    //         const blob = await res.blob()
    //         const png = await heic2any({blob, toType: "image/png", multiple: "true",})

    //         file = png[0]
    //     }
    //     reader.readAsDataURL(file)

    //     reader.onload = () => {
    //         new_img.src = reader.result
    //     }
    // } catch(error) {
    //     console.log(error)
    // }

    // document.getElementById("avatar-loader").style.display = "none"
    // new_img.style.display="revert"
  }

}
