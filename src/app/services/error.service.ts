import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msjError(e: HttpErrorResponse){
    const toast = this.toastr.error(e.error?.msg || 'Ocurrió un error desconocido', 'Error', {
      timeOut: 10000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });

    setTimeout(() => {
      this.toastr.clear(toast .toastId);
    }, 2000);
    
  }
}
