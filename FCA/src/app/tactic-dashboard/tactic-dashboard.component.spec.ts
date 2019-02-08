import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticDashboardComponent } from './tactic-dashboard.component';

describe('TacticDashboardComponent', () => {
  let component: TacticDashboardComponent;
  let fixture: ComponentFixture<TacticDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
