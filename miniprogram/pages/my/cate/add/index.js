// pages/my/cate/add/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.companyId,
      id: options.cateId || '',
      cateName: options.name || '' 
    })
  },
  getCateList(){
    
  },
  change(e){
    this.setData({
      companyId: e.detail
    })
  },
  onChange(e){
    this.data.cateName = e.detail;
  },
  save(e){
    if(!this.data.cateName){
      wx.showToast({
        title: '请填写类名',
      })
      return ;
    }
    if(this.data.id){
      this.edit()
    }else{
      this.add()
    }
  },
  add(){
    App.cloudFun({
      name: 'api',
      action: 'cate/add',
      data: {
        companyId: this.data.companyId,
        name: this.data.cateName
      }
    },res=>{
      console.log(res)
    })
  },
  edit(){
    App.cloudFun({
      name: 'api',
      action: 'cate/edit',
      data: {
        id: this.data.id,
        companyId: this.data.companyId,
        name: this.data.cateName
      }
    },res=>{
      console.log(res)
    })
  }
})