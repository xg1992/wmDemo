
const cloud = require('wx-server-sdk')
const comm = require('./comm.js');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const cm = db.command;
const field = comm.field;

class Company {
  constructor() { }
  async getCompanyList(data) {
    let skip = (data.page - 1) * data.pageSize || 0;
    let limit = data.pageSize || 20;
    let obj = {};
    if(data.isUserCompany){
      obj = { openId: data.openId }
    }
    const result = await db.collection('company').where(obj).skip(skip).limit(limit).field(field).get().then(res=>{
      return {...res,...comm.success()}
    }).catch(err=>{
      return err
    })
    return result;
  }
  // 新增记录
  async addCompany(data) {
    const hasName = await this.checkCompany(data);
    if(hasName.length){
      return comm.error('名称已存在！')
    }
    const result =  await db.collection('company').add({
      data: {
        ...data
      }
    }).then(res=>{
      return comm.success()
    }).catch(err=>{
      return err
    })
    return result;
  }
  // 删除记录
  async delCompany(data){
    const result = await db.collection('company').doc(data.id).remove().then((res)=>{
      return comm.success()
    }).catch((err)=>{
      return err
    })
    return result;
  }
  // 查询记录是否已存在
  async checkCompany(data) {
    const result = await db.collection('company').where({
      name: data.name,
      openId: data.openId
    }).get().then(res => {
      return res.data
    }).catch(err => {
      return err
    });
    return result;
  }
  // 修改信息
  async editCompany(data) {
    let _id = data._id;
    delete data._id;
    const result = await db.collection('company').doc(_id).update({
      data: data
    }).then(res => {
      return comm.success()
    }).catch(err => {
      return err
    });
    return result;
  }
  // 获取单个信息
  async getCompanyDetail(data) {
    const result = await db.collection('company').doc(data.id).field(field).get().then(res => {
      return res.data
    }).catch(err => {
      return err
    });
    return result;
  }
}
const company = new Company();
module.exports = company;