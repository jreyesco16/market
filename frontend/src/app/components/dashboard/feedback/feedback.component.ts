import { Component, OnInit, Input } from '@angular/core';

import {Feedback} from './feedback-item/feedback-item.component'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback: Feedback [] = []

  constructor() { }

  ngOnInit(): void {
  }

}
