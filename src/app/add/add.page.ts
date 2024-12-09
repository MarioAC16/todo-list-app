import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  newTask: Task = {
    title: '',
    description: '',
    type: 'trabajo',
    status: 'pendiente', 
  };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask(): void {
    if (!this.newTask.title || !this.newTask.description || !this.newTask.type) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    this.taskService.addTask(this.newTask);

    console.log('Lista de tareas después de agregar:', this.taskService.getTasks());

    this.newTask = {
      title: '',
      description: '',
      type: 'trabajo',
      status: 'pendiente',
    };
    this.router.navigate(['/list'])
  }
}