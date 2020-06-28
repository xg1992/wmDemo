const cloud = require('wx-server-sdk')
const comm = require('./comm.js');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const cm = db.command;
const filed = comm.field;
class Cate {
  // 查询大类列表
  async getCateList(data) {
    const result = await db.collection('cate').where({companyId:data.companyId}).field({...filed,companyId:false}).get().then(res=>{
      return {...res,...comm.success()}
    }).catch(err=>{
      return err
    })
    return result;
  }
  // 新增记录
  async add(data) {
    const hasName = await this.checkCate(data);
    if (hasName.length) {
      return comm.error('名称已存在！')
    }
    const result = await db.collection('cate').add({
      data: {
        ...data
      }
    }).then(res => {
      return comm.success()
    }).catch(err => {
      return err
    })
    return result;
  }
  // 查询名称是否已存在
  async checkCate(data){
    const result = await db.collection('cate').where({
      companyId: data.companyId,
      name: data.name
    }).get().then(res => {
      return res.data
    }).catch(err => {
      return err
    });
    return result;
  }
  async edit(data){
    const hasName = await this.checkCate(data);
    if (hasName.length) {
      return comm.error('名称已存在！')
    }
    let _id = data.id;
    delete data.id;
    const result = await db.collection('cate').doc(_id).update({
      data: data
    }).then(res => {
      return comm.success()
    }).catch(err => {
      return err
    })
    return result;
  }
  async deleteCate(data){
    const result = await db.collection('cate').doc(data.id).remove().then((res)=>{
      return comm.success()
    }).catch((err)=>{
      return err
    })
    return result;
  }
}
module.exports = new Cate()