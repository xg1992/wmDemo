// pages/my/index/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageOpt: {
      page: 1,
      pageSize: 10
    },
    isLast: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList();
  },
  // onShow(){
  //   wx.hideTabBarRedDot({
  //     index: 0
  //   })
  // },
  getList(){
    if(this.data.isLast) return ;
    App.cloudFun({
      name: 'api',
      action: 'company/getCompanyList',
      data: {
        ...this.data.pageOpt
      }
    },(res)=>{
      console.log(res.data)
      let data = res.data;
      let index = this.data.pageOpt.page - 1;
      let item = `list[${index}]`;
      if (data.length) {
        this.setData({
          [item]: data,
          'pageOpt.page': ++this.data.pageOpt.page
        })
        if (data.length < this.data.pageOpt.pageSize) {
          this.setData({
            isLast: true
          })
        }
      } else {
        this.setData({
          isLast: true
        })
      }
    })
  }
})