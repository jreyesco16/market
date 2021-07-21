import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Fetch } from 'src/app/Utils/Authentication'
import { CookieService } from 'ngx-cookie-service'

export interface UserService {
  id : number
  fee : number
  duration : number
  rating : number
  serviceID : number
  service : number
}

@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.sass']
})
export class ServiceItemComponent implements OnInit {

  @Output() deleteUserService = new EventEmitter<number>();

  @Input() userService: UserService = {id: 0, fee : 0 ,duration : 0,rating : 0,serviceID : 0,service : 0}

  faEdit = faEdit
  faTimes = faTimes

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  edit = () => {
    console.log("editing service", this.userService)
  }

  deleteService = async () => {
    this.deleteUserService.emit(this.userService.id);
  }
}
