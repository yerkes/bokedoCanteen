import {Http} from './http.js'

// let code;

class Request extends Http {
  login(params) {
    new Promise((resolve,rejects)=>{
      wx.login({
        // timeout: 0,
        success:res=>{
          resolve(res.code)
          console.log(res.code)
        }
      })
    }).then(code=>{
      this.request({
        url: 'login',
        data: {
          code: code,
          signature: params.signature,
          encryptedData: params.encryptedData,
          iv: params.iv,
          invite:params.invite
        },
        success: res => {
          if (res.code == 200) {
            params.success && params.success(res);
          } else {
            params.error && params.error(res.msg);
          }
        }
      })
    })
    // wx.login({
    //   success: res => {
    //     let code = res.code;
    //   }
    // })
  }

  post(params){
    this.request({
      url: params.url,
      data: params.data,
      header:{
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success: res => {
        if (res.code == 200) {
          params.success && params.success(res.data);
        } else if(res.code == 10010 || res.code == 10011){
          // wx.clearStorageSync();
          // wx.removeStorageSync('token');
          // wx.removeStorageSync('user_id');
          uni.showToast({
            title: 'token过期，请稍后重新请求',
            icon:'none'
          })
          this.reBuildToken()
          // params.error && params.error(res.msg);
        }else{
          params.error && params.error(res);
          if(res.msg != ''){
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        }
      }
    })
  }

  reBuildToken(){
    this.post({
      url:'tokenCheck',
      data:{
        token:uni.getStorageSync('token')
      },success:res=>{},error:res=>{
        console.log("重新生成")
        uni.setStorageSync('token', res.token);
      }
    })
  }

}


export {
  Request
}