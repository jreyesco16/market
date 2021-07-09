import { Component, OnInit, Input } from '@angular/core';
import { Request } from './request-item/request-item.component'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})

export class RequestsComponent implements OnInit {
  @Input() requests: Request[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
