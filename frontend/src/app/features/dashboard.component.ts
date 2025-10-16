import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../core/api';

type Task = { id: string; title: string; description?: string; done: boolean };

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Tasks</h2>

      <form (ngSubmit)="create()">
        <input [(ngModel)]="newTitle" name="title" placeholder="New task title" />
        <input [(ngModel)]="newDesc" name="description" placeholder="Description" />
        <button>Add</button>
      </form>

      <ul>
        <li *ngFor="let t of tasks">
          <label>
            <input type="checkbox" [(ngModel)]="t.done" name="done-{{t.id}}" (change)="toggle(t)" />
            <strong [style.textDecoration]="t.done ? 'line-through' : ''">{{t.title}}</strong>
          </label>
          <small *ngIf="t.description"> — {{t.description}}</small>
          <button (click)="remove(t)" style="margin-left: 8px;">Delete</button>
        </li>
      </ul>
    </div>
  `
})
export class DashboardComponent {
  tasks: Task[] = [];
  newTitle = '';
  newDesc = '';

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<Task[]>(`${API_URL}/tasks`).subscribe(r => this.tasks = r);
  }

  create() {
    this.http.post<Task>(`${API_URL}/tasks`, { title: this.newTitle, description: this.newDesc })
      .subscribe(t => { this.tasks.unshift(t); this.newTitle = ''; this.newDesc = ''; });
  }

  toggle(t: Task) {
    this.http.patch(`${API_URL}/tasks/${t.id}`, { done: t.done }).subscribe();
  }

  remove(t: Task) {
    this.http.delete(`${API_URL}/tasks/${t.id}`).subscribe(() => {
      this.tasks = this.tasks.filter(x => x.id !== t.id);
    });
  }
}
