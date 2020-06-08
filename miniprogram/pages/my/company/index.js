// pages/my/company/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageOpt: {
      page: 1,
      pageSize: 20
    },
    isLast: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  onReachBottom(){
    this.getList()
  },
  getList() {
    if(this.data.isLast) return ;
    App.cloudFun({
      name: 'company',
      action: 'getCompanyList',
      data: {
        ...this.data.pageOpt
      }
    }, (res)=>{
      let data = res.data;
      this.data.pageOpt.page++
      this.setData({
        list: this.data.list.concat(res.data)
      })
      if (data.length < this.data.pageOpt.pageSize) {
        this.setData({
          isLast: true
        })
      }
    })
  },
  showTip(e){
    let index = e.currentTarget.dataset.index;
    this.data.list.forEach((item,index)=>{ // 把其他店铺的操作按钮隐藏
      item.edit = false;
    })
    this.data.list[index].edit = true
    this.setData({
      list: this.data.list
    })
  },
  edit(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/my/company/add/index?id=' + this.data.list[index]._id,
    })
  },
  del(e){
    let index = e.currentTarget.dataset.index;
    wx.cloud.callFunction({
      name: 'company',
      data: {
        action: 'delCompany',
        data: {
          id: this.data.list[index]._id
        }
      }
    }).then(res => {
      if (res.result.code === 1){
        wx.showToast({
          title: res.result.msg,
          icon: 'none'
        })
        this.data.list.splice(index,1);
        this.setData({
          list: this.data.list
        })
      }
    })
  }
})