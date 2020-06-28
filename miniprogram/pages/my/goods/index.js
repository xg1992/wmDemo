// pages/my/goods/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: 'a3e75f055ef05745002962d021de80ec',
    cateId: 0,
    cateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
  },
  getGoodsList(){
    App.cloudFun({
      name: 'api',
      action: 'goods/getGoodsList',
      data: {
        companyId: this.data.companyId,
        cateId: this.data.cateId
      }
    }, (res) => {
      console.log(res)
      this.setData({
        cateList: res.list[0].goodsList
      })
    })
  }
})