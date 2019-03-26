/**
 * @description 网络请求的基础类，功能包含，发起请求、提示错误
 * @class Agent
 */

import JsonP from 'jsonp';

export default class Agent {
  constructor() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
  }
  // 跨域请求

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: ''
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      })
    })
  }
}
