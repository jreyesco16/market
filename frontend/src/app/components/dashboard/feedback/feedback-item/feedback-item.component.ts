import { Component, Input, OnInit } from '@angular/core';
import { prettyRating } from '../../dashboard.component'

export interface Feedback {
  id: number
  firstName: string
  lastName: string
  service: string
  rating: number
  date: string
}

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.sass']
})
export class FeedbackItemComponent implements OnInit {

  @Input() feedback : Feedback = {id: 0, firstName: '', lastName: '', service: '', rating: 0, date: ''}

  ratingColor: string = "red"

  constructor() { }

  ngOnInit(): void {
    this.ratingColor = prettyRating(this.feedback.rating)
  }
}
