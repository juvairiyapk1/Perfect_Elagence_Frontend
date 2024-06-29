import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEduProfessionalInfoComponent } from './edit-edu-professional-info.component';

describe('EditEduProfessionalInfoComponent', () => {
  let component: EditEduProfessionalInfoComponent;
  let fixture: ComponentFixture<EditEduProfessionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEduProfessionalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEduProfessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
