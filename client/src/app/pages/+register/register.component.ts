import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import {CustomValidators} from 'ng2-validation';

import { RegistryService } from './register.service';

@Component({
  selector: 'app-reg',
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  equalValidator(group: FormGroup): any {
    let password: FormControl = group.get('password') as FormControl;
    let pConfirm: FormControl = group.get('pConfirm') as FormControl;
    let valid: Boolean = password.value === pConfirm.value;
    return valid ? null : { equal: { msg: '密码和确认密码不匹配' } };
  }

  myForm: FormGroup;

  constructor(fb: FormBuilder, private regService: RegistryService) {
    this.myForm = fb.group({
      nickname: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      passwordsGroup: fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          pConfirm: ['', [Validators.required, Validators.minLength(8)]]
        },
        { validator: this.equalValidator }
      ),
      permission: 'GUEST',
      email: '',
      tel: ''
    });
  }

  toReg(myForm: FormGroup): void {
    this.regService.regUser(myForm.value);
  }
}
