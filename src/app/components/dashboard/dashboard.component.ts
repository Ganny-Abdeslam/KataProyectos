import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  lisProject: Project[] = []
  
  constructor(private _projectServie: ProjectService,
    private router: Router
  ){ }

  ngOnInit(): void{
    this.getProjects();
  }

  getProjects() {
    this._projectServie.getProjects().subscribe(data => {
      console.log(data);
      if (Array.isArray(data)) {
        this.lisProject = data;
      } else {
        console.error('No es un array:', data);
        this.lisProject = [];
      }
    });
  }  

  editProject(id: number){
    this.router.navigate(['/edit-project', id]);
  }
}
