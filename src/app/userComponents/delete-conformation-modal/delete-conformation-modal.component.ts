import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { retry } from 'rxjs';

@Component({
  selector: 'app-delete-conformation-modal',
  templateUrl: './delete-conformation-modal.component.html',
  styleUrl: './delete-conformation-modal.component.scss'
})
export class DeleteConformationModalComponent {

  reasons = [
    {value: 'marriage', viewValue: 'Marriage Fixed'},
    {value: 'found_partner', viewValue: 'Found a Partner'},
    {value: 'taking_break', viewValue: 'Taking a Break'},
    {value: 'not_satisfied', viewValue: 'Not Satisfied with Service'},
    {value: 'other', viewValue: 'Other'}
  ];

  selectedReason: string = '';
  otherReason: string = '';

  constructor(public dialog:MatDialogRef<DeleteConformationModalComponent>){}

  isReasonSelected():boolean{
    return this.selectedReason !== '' && (this.selectedReason !== 'other' || this.otherReason !== '');
  }

  getReason():{reason:string ,details:string}{
    return {
      reason: this.selectedReason,
      details : this.selectedReason === 'other' ? this.otherReason: ''
    };
  }

}
