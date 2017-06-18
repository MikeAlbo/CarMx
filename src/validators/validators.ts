import {FormControl, AbstractControl} from '@angular/forms';

class EmailValidator {
  static isValid(control: FormControl): any {

    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailRegex.test(control.value)){
      return null;
    } else {
      return {"email does not match correct pattern." : true};
    }
  }
}


class PasswordValidator {

  static correctFormat(control: FormControl): any {
    const  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    if(passwordRegex.test(control.value)){
      return null
    } else {
      return {"Password should be 4-8 digits long, contain 1 uppercase letter, 1 lowercase letter, and 1 number." :  true};
    }
  }

  static passwordMatch(AbCtrl: AbstractControl): any {
    let password = AbCtrl.get('password').value;
    let confirmPassword = AbCtrl.get('confirmPassword').value;

    if(password != confirmPassword){
      AbCtrl.get('confirmPassword').setErrors({"passwords do not match": true});
    } else {
      return null;
    }
  }
}

class IntValidator {
  static isInt(control: FormControl): any {
    const intRegex = /^\d+$/;
    if(intRegex.test(control.value)){
      return null;
    } else {
      return {"please only enter numbers, with no spaces": true};
    }

  }
}


export {EmailValidator, PasswordValidator, IntValidator};
