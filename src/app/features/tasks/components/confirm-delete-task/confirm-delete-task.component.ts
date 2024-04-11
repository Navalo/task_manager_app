import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-task',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-delete-task.component.html',
  styleUrl: './confirm-delete-task.component.scss'
})
export class ConfirmDeleteTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
