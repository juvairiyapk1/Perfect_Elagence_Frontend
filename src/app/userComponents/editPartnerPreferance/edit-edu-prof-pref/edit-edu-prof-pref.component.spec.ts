import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEduProfPrefComponent } from './edit-edu-prof-pref.component';

describe('EditEduProfPrefComponent', () => {
  let component: EditEduProfPrefComponent;
  let fixture: ComponentFixture<EditEduProfPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEduProfPrefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEduProfPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
