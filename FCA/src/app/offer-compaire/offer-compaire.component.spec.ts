import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCompaireComponent } from './offer-compaire.component';

describe('OfferCompaireComponent', () => {
  let component: OfferCompaireComponent;
  let fixture: ComponentFixture<OfferCompaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCompaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCompaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
