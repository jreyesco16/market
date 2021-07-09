import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.sass']
})
export class NavigatorComponent implements OnInit {

  constructor( private router: Router ) {}

  ngOnInit(): void {
  }
  
  route = (link: string) => {
    this.router.navigate([link])
  }

  dashboard = () => {
    this.route("/dashboard")
  }

  transactions = () => {
    this.route('/transactions')
  }

  community = () => {
    this.route("/community")
  }

  messages = () => {
    this.route("/messages")
  }

  settings = () => {
    this.route("/settings")
  }

}
