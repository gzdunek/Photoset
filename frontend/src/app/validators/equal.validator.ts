/**
 * Created on 13.09.2016.
 */

import {Directive, forwardRef, Attribute} from "@angular/core";
import {NG_VALIDATORS, Validator, AbstractControl} from "@angular/forms";
@Directive({
  selector: '[equalValidator][formControlName], [equalValidator][formControl], [equalValidator][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(()=> EqualValidator), multi: true}]
})
export class EqualValidator implements Validator {

  constructor(@Attribute('equalValidator') public equalValidator: string,
              @Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;
    // control value
    let e = c.root.get(this.equalValidator);
    // value not equal
    if (e && v !== e.value && !this.isReverse) return {
      equalValidator: false
    }
    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['equalValidator'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }
    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({equalValidator: false})
    }
    return null;
  }
}
