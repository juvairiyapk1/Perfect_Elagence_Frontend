import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRevenueChartComponent } from './subscription-revenue-chart.component';

describe('SubscriptionRevenueChartComponent', () => {
  let component: SubscriptionRevenueChartComponent;
  let fixture: ComponentFixture<SubscriptionRevenueChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionRevenueChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionRevenueChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
