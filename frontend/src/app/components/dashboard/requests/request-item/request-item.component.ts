import { Component, Input, OnInit } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { prettyRating } from '../../dashboard.component'


export interface Request {
  id: number
  firstName: string
  lastName: string
  service: string
  rating: number
  date: string
}

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.sass']
})
export class RequestItemComponent implements OnInit {
  @Input() request: Request = {id: 0, firstName: "", lastName: "", service: "", rating: 0, date: ""};

  faTimes = faTimes
  faCheck = faCheck

  rating: string = "red"

  constructor() { }

  ngOnInit(): void {

    this.rating = prettyRating(this.request.rating)
  }

  accept = () => {
    console.log("User has accepted request ", this.request)
  }

  decline = () => {
    console.log("User has declined request ", this.request)
  }
}
