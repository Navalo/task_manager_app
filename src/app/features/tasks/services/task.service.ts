import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getServiceUrl } from '../../../core/services/get-service-url';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = getServiceUrl();

  constructor(private http: HttpClient) { }

  postTask(taskData: Partial<Task>): Observable<any> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.post(url, taskData);
  }

  updateTask(taskId: number, updatedData: Partial<Task>): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.put(url, updatedData);
  }
  getTasks(): Observable<Task> {
    const url = `${this.apiUrl}/tasks`;
    return this.http.get<Task>(url);
  }

  getTaskById(taskId: number): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.get<Task>(url);
  }
  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.delete(url);
  }

}
