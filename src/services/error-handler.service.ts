import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError() {
    const toastr = this.injector.get(ToastrService);
    toastr.warning('Unexpected error has occurred');
  }
}
