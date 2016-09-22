/**
 * Created on 13.09.2016.
 */

import {Directive, forwardRef} from "@angular/core";
import {NG_ASYNC_VALIDATORS, AbstractControl, Validator} from "@angular/forms";
import {UserService} from "../services/user.service";

@Directive({
  selector: '[asyncUsernameValidator][ngModel],[asyncUsernameValidator][formControl]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => AsyncUsernameValidator),
    multi: true
  }, UserService]
})
export class AsyncUsernameValidator implements Validator {


  constructor(private userService: UserService) {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    return new Promise(resolve => this.userService.isUsernameExisting(c.value).subscribe(res => {
      if (res == false) {
        resolve(null);
      } else {
        resolve({validateUsernameTaken: {valid: false}});
      }
    }));
  }

}
