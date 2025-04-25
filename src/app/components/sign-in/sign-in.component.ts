import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule, SpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  email: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ){ }

  addUser(){
    if(this.username == '' || this.password == '' || this.confirmPassword == '' || this.email == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return;
    }

    if(this.password != this.confirmPassword){
      this.toastr.error('Las Passwords ingresadas son distintas', 'Error');
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario Registrado');
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.loading = false;
        console.log(e)
        this._errorService.msjError(e);
      }
    });
  }

  ngOnInit(): void {

  }
}
