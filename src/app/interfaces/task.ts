export interface Task {
    title: string;
    description: string;
    type: 'trabajo' | 'casa' | 'negocio'; // Enum para restringir valores
    status: 'completada' | 'pendiente';  // Enum para estatus válidos
  }