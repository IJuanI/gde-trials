import { Component } from '@angular/core';
import { departments, Department } from 'client/data/categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  departments: Department[] = departments;
}
