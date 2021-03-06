/*
 * @Author: honghong
 * @LastEditors: honghong
 * @Description: 登录
 * @email: 3300536651@qq.com
 * @Date: 2019-04-16 15:57:43
 * @LastEditTime: 2019-10-11 15:28:50
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
import { Fcverifycode } from 'src/fccomponents/fcverifycode/fcverifycode.component';
import { CacheService } from 'src/fccore/common/cache';
const PROJECT_NAME = environment.projectName;

@Component({
  selector: 'syssignin',
  templateUrl: './syssignin.component.html',
  styleUrls: ['./syssignin.less']
})
export class SyssigninComponent implements OnInit {
  hasError = false;
  msg = '用户名或者密码错误';
  userId = '';
  password = '';
  // 显示错误
  showError = 'N';
  fcSuccess: string;
  // 验证码
  @ViewChild('verifyCode', { static: true }) verifyCode: Fcverifycode;
  constructor(private router: Router) { }
  ngOnInit() {
    if (this.loginValid(this.userId, this.password)) {
      this.router.navigate([
        '/' + environment.pid.toLocaleLowerCase() + '/home'
      ]);
    }
  }
  /**
   * 根据用户密码登录，并存储当前用户的相关信息
   */
  login() {
    if (this.verifyCode.fcShowError === 'N') {
      if (this.loginValid(this.userId, this.password)) {
        this.hasError = false;
        CacheService.setS('userinfo', { USERCODE: 'admin' });
        CacheService.setS('token', 'ab2be4ef08c0418bab13a6a88c9772e7');
        this.router.navigate([
          '/' + environment.pid.toLocaleLowerCase() + '/home'
        ]);
      } else {
        this.hasError = true;
      }
    }
  }

  loginValid(userId, password): boolean {
    if (userId === 'admin' && password === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
