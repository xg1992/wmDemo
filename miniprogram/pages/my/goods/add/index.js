// pages/my/add/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {
      name: {
        label: '名称',
        value: '',
        required: true
      },
      peisong: {
        label: '配送',
        value: '2',
        name: 'peisong',
        required: true
      },
      qisong: {
        label: '起送',
        value: '10',
        type: 'number',
        required: true
      },
      remark: {
        label: '备注',
        value: '',
        type: 'textarea',
        autosize: { maxHeight: 100, minHeight: 50 },
        maxlength: 200,
        limit: true,
        required: false
      }
    },
    form: {},
    fileList: [], // 图片上传列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setForm();
    console.log(options);
    if(options && options.id){
      this.data.id = options.id;
      this.getDetail();
    }
  },
  setForm(){
    for (let key in this.data.list) {
      console.log(key)
      this.data.form[key] = this.data.list[key].value;
    }
    this.setData({
      form: this.data.form
    })
  },
  getDetail(){
    App.cloudFun({
      name: 'api',
      action: 'company/getCompanyDetail',
      data: { id: this.data.id }
    },res=>{
      this.setData({
        form: res
      })
    })
  },
  onChange(e){
    let name = e.target.dataset.name;
    this.data.form[name] = e.detail
  },
  submit(){
    let list = this.data.list;
    let form = this.data.form;
    for(let key in list){
      if (list[key].required){
        if (form[key] === '') {
          wx.showToast({
            title: '请完善必填信息',
            icon: 'none'
          })
          return;
        }
      }
    }
    if(this.data.id){
      this.edit();
    }else{
      this.add();
    }
  },
  add(){
    App.cloudFun({
      name: 'api',
      action: 'company/addCompany',
      data: this.data.form
    },res=>{
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  edit(){
    App.cloudFun({
      name: 'api',
      action: 'company/editCompany',
      data: this.data.form
    }, res => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
    
  }
})