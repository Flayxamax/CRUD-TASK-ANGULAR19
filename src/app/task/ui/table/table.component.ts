import { Component, effect, inject, input, NgModule } from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [
    FormsModule,
    CommonModule,
    DateFormatPipe,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './table.component.html',
  standalone: true,
})
export class TableComponent {

  tasks = input.required<Task[]>();

  isDropdownOpen = false;
  selectedOption = 'Last 30 days';
  options = [
    { id: 'last-day', label: 'Ultimo día' },
    { id: 'last-7-days', label: 'Ultimos 7 días' },
    { id: 'last-30-days', label: 'Ultimos 30 días' },
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }
}
