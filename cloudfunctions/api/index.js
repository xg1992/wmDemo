
// const cloud = require('wx-server-sdk')
// const comm = require('./comm.js')
const cate = require('./cate.js')
const company = require('./company.js')
const goods = require('./goods.js')

async function found(ctr,fun,data){
  if(ctr[fun] && typeof ctr[fun] === 'function'){
    return await ctr[fun](data)
  }else{
    return '找不到方法'
  }
}
// 云函数入口函数
exports.main = async (params, context) => {
  params.data.openId = params.userInfo.openId;
  let api = params.action.split('/');
  let ctr = api[0]; // 云函数归类
  let fun = api[1]; // 具体的云函数名
  let res; // 需返回前端的结果
  let p = [fun, params.data] // 共同参数集合
  const obj = {
    'company': await found(company, ...p),
    'cate': await found(cate, ...p),
    'goods': await found(goods, ...p)
  }
  res = obj[ctr] || '找不到方法';
  return res
}