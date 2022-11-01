import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGeneratorApartSeatsComponent } from './ticket-generator-apart-seats.component';

describe('TicketGeneratorApartSeatsComponent', () => {
  let component: TicketGeneratorApartSeatsComponent;
  let fixture: ComponentFixture<TicketGeneratorApartSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGeneratorApartSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketGeneratorApartSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
