import { Injectable } from '@angular/core';
import { getSessionStorage } from '../../../utils/cache';
import { User } from './index.interface';

@Injectable()
export class IndexService {
  private user: User | null = null;
  constructor() {
    this.getUserInfo();
  }

  getUserInfo() {
    let user = getSessionStorage('user');
    try {
      this.user = user == null ? null : JSON.parse(user);
    } catch (err) {
      console.log(err);
    }
  }

  isLogin(): boolean {
    this.getUserInfo();
    if (this.user !== null && (this.user.id === 0 || this.user.id)) {
      return true;
    } else {
      return false;
    }
  }

  getCurUser(): User | null {
    this.getUserInfo();
    return this.user;
  }
}
