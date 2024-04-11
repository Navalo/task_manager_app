import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right'; // Position: 'start', 'center', 'end', 'left', 'right'
    const verticalPosition: MatSnackBarVerticalPosition = 'top'; // Position: 'top', 'bottom'

    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: ['blue-snackbar'],
    });
  }
}
