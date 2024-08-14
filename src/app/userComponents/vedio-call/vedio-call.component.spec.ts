import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioCallComponent } from './vedio-call.component';

describe('VedioCallComponent', () => {
  let component: VedioCallComponent;
  let fixture: ComponentFixture<VedioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VedioCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VedioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
