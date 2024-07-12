import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSubscriptionChartComponent } from './annual-subscription-chart.component';

describe('AnnualSubscriptionChartComponent', () => {
  let component: AnnualSubscriptionChartComponent;
  let fixture: ComponentFixture<AnnualSubscriptionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnualSubscriptionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualSubscriptionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
