// pages/my/manage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '/images/user-unlogin.png',
    },
    cell: [
      {
        title: '商家管理',
        icon: 'shop',
        url: '/pages/my/company/index'
      },
      {
        title: '商家入驻',
        icon: 'add',
        url: '/pages/my/company/add/index'
      },
      {
        title: '商品大类',
        icon: 'bars',
        url: '/pages/my/cate/index'
      },
      {
        title: '商品管理',
        icon: 'cart',
        url: '/pages/my/goods/index'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },
  // onShow(){
  //   wx.showTabBarRedDot({
  //     index: 0
  //   })
  // },
  getUserInfo(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo(info){
    console.log(info)
    this.setData({userInfo: info.detail.userInfo})
  }
})