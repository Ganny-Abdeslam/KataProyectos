import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl
    this.myApiUrl = 'api/projects'
  }

  createProject(projectData: Project): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/createProject`, projectData);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }  
}
