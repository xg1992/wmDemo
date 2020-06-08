// pages/my/cate/select/select.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyid: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    value: ''
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getList()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getList(){
      App.cloudFun({
        name: 'api',
        action: 'company/getCompanyList',
        data: {
          page: 1,
          pageSize: 100000
        }
      },res=>{
        console.log(res)
        let arr = [];
        res.data.forEach((item,index)=>{
          arr[index] = {}
          arr[index].text = item.name
          arr[index].value = item._id
        })
        this.setData({
          list: arr,
          value: this.data.companyid || arr[0].value
        })
        this.triggerEvent('onchange', this.data.companyid || arr[0].value)
      })
    },
    change(e){
      console.log(e.detail)
      this.triggerEvent('onchange', e.detail)
    },
  }
})
