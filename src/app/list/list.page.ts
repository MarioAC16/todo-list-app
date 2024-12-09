import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  pendingTasks: any[] = [];
  @Output() taskUpdated = new EventEmitter<void>();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alertController: AlertController) {}

    openHome() {
      this.router.navigate(['/home'])
    }

  ngOnInit() {
    this.pendingTasks = this.taskService.getTasksByStatus('pendiente')
    .map(task => ({ ...task, showDetails: false }));
  }
  toggleDetails(task: any) {
    task.showDetails = !task.showDetails;
  }
  async deleteTask(task: any): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            const index = this.pendingTasks.indexOf(task);
            if (index !== -1) {
              this.taskService.deleteTask(index);
              this.pendingTasks = this.taskService.getTasksByStatus('pendiente');
              this.taskUpdated.emit();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  approveTask(task: any): void {
    const index = this.pendingTasks.indexOf(task);
    if (index !== -1) {
      this.taskService.markTaskAsCompleted(index);
      this.pendingTasks = this.taskService.getTasksByStatus('pendiente');
      this.taskUpdated.emit();
    }
  }
}
