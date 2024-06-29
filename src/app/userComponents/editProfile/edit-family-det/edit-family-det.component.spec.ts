import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamilyDetComponent } from './edit-family-det.component';

describe('EditFamilyDetComponent', () => {
  let component: EditFamilyDetComponent;
  let fixture: ComponentFixture<EditFamilyDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFamilyDetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFamilyDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
