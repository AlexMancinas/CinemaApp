import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketQrComponent } from './ticket-qr.component';

describe('TicketQrComponent', () => {
  let component: TicketQrComponent;
  let fixture: ComponentFixture<TicketQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
