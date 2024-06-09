import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.delUser = this.delUser.bind(this);
  }

  isShowPopup: boolean = false;
  operateMode?: string;
  userPermissions?: Array<any>;
  userList: any;
  repeatPw: string = '';

  trackByPermissionList(index: number, permission: any) {
    return index;
  }

  ngOnInit() {
    document.documentElement.classList.add('js');
    document.documentElement.classList.add('no-touch');
    this.userService.getPermissionList().then(response => {
      this.userPermissions = response;
    });

    this.userService.getUsers().then(({ count, rows }) => {
      this.userList = rows;
    });
  }

  //  createUser(num: number): Array<any> {
  //     let arr= [];
  //     let obj = null;
  //     for(let i=0; i<num; i++) {
  //         obj = {
  //             id: i,
  //             username: 'Sophia',
  //             password: '123123123',
  //             permission: '管理员',
  //             email: 'XXXXXX@163.com',
  //             tel: '133-XXXX-000'+(i+1),
  //             file: null,
  //             avatarUrl: '/images/member_140x145.jpg'
  //         };
  //         arr.push(obj);
  //     }
  //     return arr;
  // }

  trackByUserList(index: number, userInfo: any): number {
    return userInfo.id;
  }

  popupAnimate() {
    document.documentElement.classList.add('md-perspective');
  }

  addUser() {
    this.curUserData = Object.assign({}, this.userObj);
    this.popupAnimate();
    this.isShowPopup = true;
    this.operateMode = 'add';
  }

  getObjBykey(data: Array<any>, key: string, value: string | number) {
    let curObj = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty(key) && data[i][key] == value) {
        curObj = Object.assign({}, data[i]);
      }
    }
    return curObj;
  }

  editUser(id: number) {
    this.popupAnimate();
    this.isShowPopup = true;
    this.curUserData = this.getObjBykey(this.userList, 'id', id);
    this.operateMode = 'edit';
  }

  delUser(id: number) {
    this.popupAnimate();
    this.userService.deleteUser(id).then(() => {
      this.userService.getUsers().then(({ count, rows }) => {
        this.userList = rows;
      });
    });
  }

  submit() {
    this.isShowPopup = false;
    switch (this.operateMode) {
      case 'add':
        this.userService
          .addUser(this.curUserData)
          .then(() => {
            this.userService.getUsers().then(({ count, rows }) => {
              this.userList = rows;
            });
          })
          .catch(err => {
            // console.log(err);
          });
        break;
      case 'edit':
        this.userService.updateUser(this.curUserData).then(() => {
          this.userService.getUsers().then(({ count, rows }) => {
            this.userList = rows;
          });
        });
        break;
    }
  }

  cancel() {
    this.isShowPopup = false;
  }

  ngOnDestroy() {
    document.documentElement.classList.remove('js');
    document.documentElement.classList.remove('no-touch');
    document.documentElement.classList.remove('md-perspective');
  }

  userObj: { [propName: string]: any } = {
    user: '',
    permission: '',
    password: '',
    email: '',
    tel: '',
    file: null,
    avatarUrl: ''
  };

  curUserData = Object.assign({}, this.userObj);
}
