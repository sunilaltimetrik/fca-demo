import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListingComponent } from './offer-listing.component';

describe('OfferListingComponent', () => {
  let component: OfferListingComponent;
  let fixture: ComponentFixture<OfferListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
