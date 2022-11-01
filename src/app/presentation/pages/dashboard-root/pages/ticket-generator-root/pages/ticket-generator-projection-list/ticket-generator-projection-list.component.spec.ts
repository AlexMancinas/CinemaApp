import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGeneratorProjectionListComponent } from './ticket-generator-projection-list.component';

describe('TicketGeneratorProjectionListComponent', () => {
  let component: TicketGeneratorProjectionListComponent;
  let fixture: ComponentFixture<TicketGeneratorProjectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGeneratorProjectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketGeneratorProjectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
