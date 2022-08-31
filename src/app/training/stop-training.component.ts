import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-stop-taining',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-actions>
      <mat-dialog-content
        >You already got {{ passedData.progress }}</mat-dialog-content
      >
      <button mat-raised-button [mat-dialog-close]="true">
        Cancel training
      </button>
      <button mat-raised-button [mat-dialog-close]="false">
        Continue training
      </button>
    </mat-dialog-actions>`,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
