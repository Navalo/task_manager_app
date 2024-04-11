import { FormControl } from "@angular/forms";

export interface Task {
    id?: number;
    title: string;
    description: string;
    dueDate: Date | null;
 }

 export interface TaskFormControl {
    title: FormControl<string>;
    description: FormControl<string>;
    dueDate: FormControl<Date | null>;
 }
