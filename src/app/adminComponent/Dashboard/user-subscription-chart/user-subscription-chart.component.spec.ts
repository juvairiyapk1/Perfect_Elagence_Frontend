import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubscriptionChartComponent } from './user-subscription-chart.component';

describe('UserSubscriptionChartComponent', () => {
  let component: UserSubscriptionChartComponent;
  let fixture: ComponentFixture<UserSubscriptionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSubscriptionChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSubscriptionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
