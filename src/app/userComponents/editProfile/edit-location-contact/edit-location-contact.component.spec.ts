import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationContactComponent } from './edit-location-contact.component';

describe('EditLocationContactComponent', () => {
  let component: EditLocationContactComponent;
  let fixture: ComponentFixture<EditLocationContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLocationContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLocationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
