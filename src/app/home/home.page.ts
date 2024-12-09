import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  completedTasks: any[] = [];
  pendingTasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router ) {}

    openList() {
      this.router.navigate(['/list'])
    }
    openAdd() {
      this.router.navigate(['/add'])
    }

    ngOnInit() {
      this.loadTasks();
    }
    
    loadTasks() {
      this.completedTasks = this.taskService.getTasksByStatus('completada')
        .slice(0, 4)
        .map(task => ({ ...task, showDetails: false }));
      this.pendingTasks = this.taskService.getTasksByStatus('pendiente')
        .slice(0, 4)
        .map(task => ({ ...task, showDetails: false }));
    }
}
