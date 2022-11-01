import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-qr',
  templateUrl: './ticket-qr.component.html',
  styleUrls: ['./ticket-qr.component.scss']
})
export class TicketQrComponent implements OnInit {

  public redirecUrl = environment.digitalTicketUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.redirecUrl = this.redirecUrl + this.activatedRoute.snapshot.params['ticketId'];
  }

}
