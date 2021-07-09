import { Component, Input, OnInit } from '@angular/core';

export interface Request {
  firstName: string
  lastName: string
  service: string
  rating: number
}

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.sass']
})
export class RequestItemComponent implements OnInit {
  @Input() request: Request = {firstName: "", lastName: "", service: "", rating: 0};

  constructor() { }

  ngOnInit(): void {
  }

}
