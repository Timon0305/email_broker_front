import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQuoteComponent } from './check-quote.component';

describe('CheckQuoteComponent', () => {
  let component: CheckQuoteComponent;
  let fixture: ComponentFixture<CheckQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
