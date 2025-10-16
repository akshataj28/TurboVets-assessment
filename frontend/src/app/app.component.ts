import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="shell">
      <h1>TurboVets Task Manager</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .shell { font-family: system-ui, Arial, sans-serif; padding: 24px; }
    h1 { margin-top: 0; font-size: 22px; }
    .card { padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; margin: 16px 0; }
    button { padding: 6px 12px; }
    input, select { padding: 6px 8px; margin: 4px 0; }
  `]
})
export class AppComponent {}
