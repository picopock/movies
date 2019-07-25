import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';

function usernameValidator(control: FormControl): { [s: string]: boolean } {
  if (!/^[_a-zA-Z].*/.test(control.value)) {
    return { invalidUsername: true };
  }
}

class VerificationCode {
  code: string;
  codeArray: Array<string> = new Array(
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  );

  constructor() {}

  geneCode() {
    this.code = '';
    for (let i = 0; i < 4; i++) {
      let r = parseInt((Math.random() * this.codeArray.length).toString(), 10);
      this.code += this.codeArray[r];
    }
  }

  updateCode() {
    this.geneCode();
    return this.code;
  }
}

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  verificationCode: VerificationCode;
  codePic = '';

  toLogin(form: FormGroup) {
    let obj = Object.assign({}, form.value);
    delete obj.code;
    this.loginService.Login(obj).catch(err => console.log(err));
  }

  myForm: FormGroup;

  constructor(fb: FormBuilder, private loginService: LoginService) {
    this.verificationCode = new VerificationCode();
    this.codePic = this.verificationCode.updateCode();
    this.myForm = fb.group({
      username: ['', [Validators.required, usernameValidator, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      code: ['', [Validators.required, Validators.pattern(this.codePic)]]
    });
  }

  updateCode() {
    this.codePic = this.verificationCode.updateCode();
  }
}
