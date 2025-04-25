import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { RouterModule } from '@angular/router';
import { Project } from '../../interfaces/project';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})

export class CreateProjectComponent {
  project: Project = {
    name: '', description: '', userId: 0, id: 0,
  };
  message: string = '';

  constructor(private _projectService: ProjectService) {}

  onSubmit() {
    if (this.project.userId && this.project.name && this.project.description) {
      this._projectService.createProject(this.project).subscribe(
        (response) => {
          this.message = 'Proyecto creado exitosamente';
          this.project = { id: 0, name: '', description: '', userId: 0 };
        },
        (error) => {
          this.message = 'Error al crear el proyecto. Intente nuevamente.';
        }
      );
    }
  }
}