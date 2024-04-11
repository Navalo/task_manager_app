import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteTaskComponent } from '../../components/confirm-delete-task/confirm-delete-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    HttpClientModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements AfterViewInit {

  displayedColumns: string[] = ['Id', 'Title', 'Description', 'DueDate', 'actions'];

  data: Task[] = [];

  isLoadingResults = true;

  constructor(private router: Router, 
    private taskService: TaskService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.getTasks();
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId)
      .subscribe({
        next: (response: any) => {
          this.snackbarService.openSnackBar('Task deleted successfully')
          this.getTasks();
        },
        error: (error: any) => {
          console.error('Error deleting task:', error);
        }
      });
  }

  navigateToCreate = () => this.router.navigate(['/tasks/create']);

  navigateToDetails = (taskId: number) => this.router.navigate([`/tasks/details/${taskId}`]);
  
  navigateToEdit = (taskId: number) => this.router.navigate([`/tasks/edit/${taskId}`]);

  getTasks() {
    this.isLoadingResults = true;

    return this.taskService.getTasks(
    ).pipe(
      catchError(() => of([])),
    ).subscribe((data: any) => {
      this.isLoadingResults = false;
      this.data = data.data;
    });
  }

  openConfirmationDialog(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteTaskComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(taskId);
      }
    });
  }
}