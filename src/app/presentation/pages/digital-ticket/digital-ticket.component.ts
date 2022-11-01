import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-ticket',
  templateUrl: './digital-ticket.component.html',
  styleUrls: ['./digital-ticket.component.scss']
})
export class DigitalTicketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hello mom');
  }

}
