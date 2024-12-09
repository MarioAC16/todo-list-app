import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { title: 'Revisar correos importantes', description: 'Leer y responder correos electrónicos del trabajo.', type: 'trabajo', status: 'pendiente' },
    { title: 'Limpiar la cocina', description: 'Lavar los platos y organizar la despensa.', type: 'casa', status: 'pendiente' },
    { title: 'Actualizar inventario del negocio', description: 'Registrar nuevos productos y actualizar el stock.', type: 'negocio', status: 'pendiente' },
    { title: 'Preparar la presentación semanal', description: 'Crear diapositivas para la reunión del equipo.', type: 'trabajo', status: 'pendiente' },
    { title: 'Comprar suministros para el hogar', description: 'Adquirir productos de limpieza y alimentos básicos.', type: 'casa', status: 'pendiente' },
    { title: 'Diseñar la nueva vitrina del negocio', description: 'Crear un diseño atractivo para la presentación de productos.', type: 'negocio', status: 'pendiente' },
    { title: 'Terminar reporte mensual', description: 'Completar el reporte financiero para el jefe.', type: 'trabajo', status: 'completada' },
    { title: 'Lavar la ropa', description: 'Clasificar, lavar y tender la ropa de la semana.', type: 'casa', status: 'completada' },
    { title: 'Organizar los archivos contables', description: 'Archivar recibos y facturas en su carpeta correspondiente.', type: 'negocio', status: 'completada' },
    { title: 'Regar las plantas', description: 'Asegurarse de que todas las plantas tengan suficiente agua.', type: 'casa', status: 'completada' },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksByStatus(status: 'completada' | 'pendiente'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    console.log('Tarea agregada:', task);
    console.log('Lista de tareas actual:', this.tasks);
  }

  updateTask(index: number, updatedTask: Task | null): void {
    if (updatedTask === null) {
      this.tasks.splice(index, 1);
    } else {
      this.tasks[index] = updatedTask;
    }
    console.log('Lista de tareas actualizada:', this.tasks);
  }

  markTaskAsCompleted(index: number): void {
    if (this.tasks[index]) {
      this.tasks[index].status = 'completada';
      console.log('Tarea marcada como completada:', this.tasks[index]);
    }
  }

  deleteTask(index: number): void {
    if (index !== -1 && index < this.tasks.length) {
      const removedTask = this.tasks.splice(index, 1)[0];
      console.log('Tarea eliminada:', removedTask);
      console.log('Lista de tareas actualizada:', this.tasks);
    } else {
      console.log('Índice de tarea inválido');
    }
  }
}