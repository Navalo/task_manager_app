import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from "./shared/header/header.component";
import { HttpClientModule } from '@angular/common/http';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatButtonModule, HeaderComponent, HttpClientModule ],
})
export class AppComponent {
  title = 'Task-Manager-App';
}
