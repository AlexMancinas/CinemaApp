import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGeneratorHomeComponent } from './ticket-generator-home.component';

describe('TicketGeneratorHomeComponent', () => {
  let component: TicketGeneratorHomeComponent;
  let fixture: ComponentFixture<TicketGeneratorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGeneratorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketGeneratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
