import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationPrefComponent } from './edit-location-pref.component';

describe('EditLocationPrefComponent', () => {
  let component: EditLocationPrefComponent;
  let fixture: ComponentFixture<EditLocationPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLocationPrefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLocationPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
