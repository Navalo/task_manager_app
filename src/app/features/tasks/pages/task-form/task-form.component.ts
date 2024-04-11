import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { Task, } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  disableFormControls = false;
  visibleUpdateButton = false;
  taskForm!: FormGroup;
  
  taskId? = '';
  pageTitle = 'Create Task';

  constructor(private taskService: TaskService, 
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get("id")?.toString();
    if (this.taskId) this.getTask(parseInt(this.taskId));

    this.taskForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('',),
      dueDate: new FormControl(null, [Validators.required])
    });

    this.route.url.subscribe(urlSegments => {
      const isDetailsRoute = urlSegments.some(segment => segment.path === 'details');
      const isUpdateRoute = urlSegments.some(segment => segment.path === 'edit');

      this.pageTitle = isDetailsRoute ? 'Task Details' : (isUpdateRoute ? 'Update Task' : 'Create Task');
      this.visibleUpdateButton = isUpdateRoute;
      this.disableFormControls = isDetailsRoute;
      this.setFormControlsState();
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData: Partial<Task> = this.taskForm.value;

      this.taskService.postTask(formData)
        .subscribe({
          next: (response: any) => {
            this.snackbarService.openSnackBar('Task created successfully');
            this.taskForm.reset();
          },
          error: (error: any) => {
            console.error('Error creating task:', error);
          }
        });
    }
  }

  updateTask(): void {
    if (this.taskForm.valid && this.taskId) {
      const formData: Partial<Task> = this.taskForm.value;

      this.taskService.updateTask(parseInt(this.taskId),formData)
        .subscribe({
          next: (response: any) => {
            this.snackbarService.openSnackBar('Task Updated successfully');
          },
          error: (error: any) => {
            console.error('Error creating task:', error);
          }
        });
    }
  }

  setFormControlsState(): void {
    if (this.disableFormControls) {
      this.taskForm.disable();
    } else {
      this.taskForm.enable();
    }
  }

  getTask(taskId: number) {
    this.taskService.getTaskById(taskId)
      .subscribe({
        next: (response: any) => {
          console.log('Task get successfully:', response);
          this.taskForm.patchValue({
            title: response.data.title,
            description: response.data.description,
            dueDate:response.data.dueDate
          });
        },
        error: (error: any) => {
          console.error('Error getting task:', error);
        }
      });
  }

  navigateToList = () => this.router.navigate(['/tasks']);
}
