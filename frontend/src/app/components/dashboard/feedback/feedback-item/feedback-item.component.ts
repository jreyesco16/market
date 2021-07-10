import { Component, Input, OnInit } from '@angular/core';

export interface Feedback {
  firstName: string
  lastName: string
  service: string
  rating: number
}

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.sass']
})
export class FeedbackItemComponent implements OnInit {

  @Input() feedback : Feedback = {firstName: '', lastName: '', service: '', rating: 0}

  constructor() { }

  ngOnInit(): void {
  }
}
