import { config } from './config.js'

class Http {
  request(params) {
    uni.request({
      url: config.domain + params.url,
      method: 'POST',
      data: params.data,
      header: params.header,
      success: (res) => {
        if (res.statusCode == 200) {
          params.success && params.success(res.data)
        }else{
          uni.showToast({
            title: '错误，请重试一次',
            icon:'none'
          })
        }
      }
    })
  }
}	

export { Http }