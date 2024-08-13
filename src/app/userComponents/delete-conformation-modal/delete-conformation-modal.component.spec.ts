import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConformationModalComponent } from './delete-conformation-modal.component';

describe('DeleteConformationModalComponent', () => {
  let component: DeleteConformationModalComponent;
  let fixture: ComponentFixture<DeleteConformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConformationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
