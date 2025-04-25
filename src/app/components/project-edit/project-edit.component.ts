import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})

export class ProjectEditComponent implements OnInit {
  projectForm!: FormGroup;
  projectId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.loadProject();
  }

  loadProject() {
    const fakeProject = { nombre: 'Proyecto Demo', descripcion: 'Esto es un demo' };
    this.projectForm.patchValue(fakeProject);
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const updatedData = this.projectForm.value;

      console.log('Guardado!', updatedData);
      this.router.navigate(['/dashboard']);
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  get nombre() {
    return this.projectForm.get('nombre')!;
  }
  
  get descripcion() {
    return this.projectForm.get('descripcion')!;
  }
  
}