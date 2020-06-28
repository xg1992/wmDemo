// pages/my/cate/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    value: '', // 默认店铺id
    id: '', // 选择的店铺id
    cateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow(){
    if(this.data.notFirst){
      this.getCateList()
    }
    this.data.notFirst = true;
  },
  change(e){
    console.log(e.detail)
    this.setData({
      id: e.detail
    })
    this.getCateList();
  },
  getCateList(){
    App.cloudFun({
      name: 'api',
      action: 'cate/getCateList',
      data: {
        companyId: this.data.id
      }
    }, (res) => {
      console.log(res)
      this.setData({
        cateList: res.data
      })
    })
  },
  onClose(e){
    const cateId = e.currentTarget.dataset.cateId;
    const companyId = e.currentTarget.dataset.companyId;
    const index = e.currentTarget.dataset.index;
    const name = this.data.cateList[index].name;
    const { position, instance } = e.detail;
    switch (position) {
      case 'left': 
        wx.navigateTo({
          url: `./add/index?cateId=${cateId}&companyId=${companyId}&name=${name}`,
        })
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '请确认是否删除？',
          success: (res)=> {
            if (res.confirm) {
              console.log('用户点击确定')
              this.deleteCate(cateId,index)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
            instance.close();
          }
        })
        break;
    }
  },
  deleteCate(id,index){
    App.cloudFun({
      name: 'api',
      action: 'cate/deleteCate',
      data: {
        id
      }
    }, (res) => {
      console.log(res)
      this.data.cateList.splice(index,1);
      if(res.code === 1){
        this.setData({
          cateList: this.data.cateList
        })
      }
    })
  }
})