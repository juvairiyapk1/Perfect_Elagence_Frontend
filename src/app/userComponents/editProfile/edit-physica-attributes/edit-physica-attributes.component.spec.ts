import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhysicaAttributesComponent } from './edit-physica-attributes.component';

describe('EditPhysicaAttributesComponent', () => {
  let component: EditPhysicaAttributesComponent;
  let fixture: ComponentFixture<EditPhysicaAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPhysicaAttributesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPhysicaAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
