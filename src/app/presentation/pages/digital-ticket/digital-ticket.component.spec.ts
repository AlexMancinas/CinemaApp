import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalTicketComponent } from './digital-ticket.component';

describe('DigitalTicketComponent', () => {
  let component: DigitalTicketComponent;
  let fixture: ComponentFixture<DigitalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
