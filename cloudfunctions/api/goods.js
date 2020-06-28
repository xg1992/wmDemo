const cloud = require('wx-server-sdk')
const comm = require('./comm.js');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const cm = db.command;
const filed = comm.field;

class Goods {
  constructor(){}
  // 查询名称是否已存在
  async checkName(data){
    const result = await db.collection('goods').where({
      companyId: data.companyId,
      goodsName: data.goodsName
    }).get().then(res => {
      return res.data
    }).catch(err => {
      return err
    });
    return result;
  }
  async addGoods(data){
    const hasName = await this.checkName(data);
    if (hasName.length) {
      return comm.error('名称已存在！')
    }
    const result = await db.collection('goods').add({
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
  async getGoodsList(data){
    const result = await db.collection('cate')
    .aggregate()
    .match({ // 聚合查询条件，相当于where
      companyId: data.companyId
    })
    .lookup({
      from: 'goods',
      let: {
        id: '$_id',
      },
      pipeline: cm.aggregate.pipeline()  // 子查询操作链
      .match(cm.expr(cm.aggregate.and([
        cm.aggregate.eq(['$cateId', '$$id'])
      ])))
      .project({   // 过滤不需要的字段名。相当于field
        companyId: 0,
        cateId: 0,
        ...filed
      })
      .done(),
      as: 'goodsList',
    })
    .project({
      openId: false,
      companyId: false
    })
    // .field({...filed,companyId:false})
    .end()
    .then(res=>{
      return {...res,...comm.success()}
    }).catch(err=>{
      return err
    })
    return result;
  }
}

module.exports = new Goods()