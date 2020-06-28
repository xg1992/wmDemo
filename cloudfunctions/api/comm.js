class Comm {
  constructor(){
    this.d = 1;
    this.field = {
      openId: false
    }
  }
  success(msg) {
    return {
      code: 1,
      msg: msg || '操作成功'
    }
  }
  error(msg){
    return {
      code: 0,
      msg: msg || '请求失败'
    }
  }
}
module.exports = new Comm()