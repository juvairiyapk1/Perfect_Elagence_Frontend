import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicPreferenceComponent } from './edit-basic-preference.component';

describe('EditBasicPreferenceComponent', () => {
  let component: EditBasicPreferenceComponent;
  let fixture: ComponentFixture<EditBasicPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBasicPreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBasicPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
