// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //故障伞的部位图路径数组
    picUrls:[],
    //故障伞标号和备注
    inputValue:{
      num: 0,
      desc:""
    },
    //故障类型数组
    checkboxvalue:[],
    //选取照片提示
    actionText:"拍照/相册",
    //提交按钮的背景色，未勾选时默认无颜色
    btnBgc: "",
    //复选框的value，此处预定义后渲染到页面
    itemsValue:[
      {
        checked: false,
        value: "伞柄坏了",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "伞面破漏",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "二维码污损",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "伞骨弯折",
        color: "#b9dd08"
      },
      {
        checked: false,
        value: "其他",
        color: "#b9dd08"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '问题上报',
    })
  },

  //勾选故障类型，获取类型值
  checkboxchange: function(e){
    let _values = e.detail.value;
    if(_value.length ==0){
      this.setData({
        btnBgc:""
      })
    }else{
      this.setData({
        checkboxValue: _values,
        btnBgc: "#b9dd08"
      })
    }
  },

  //输入雨伞编号,存入inputValue
  numberChange: function(e){
    this.setData({
      inputValue:{
        num: e.detail.value,
        desc: this.data.inputValue.desc
      }
    })
  },
  
  //输入备注，存入inputValue
  desChange: function(e){
    this.setData({
      inputValue:{
        num: this.data.inputValue.num,
        desc: e.detail.value
      }
    })
  },

  //提交到服务器
  formSubmit: function(e){
    if(this.data.picUrls.length>0&&this.data.checkboxValue.length>0){
      wx.request({
        url: 'https://www.mos.msg/msg',
        data:{
          //picUrls: this.data.picUrls,
          //inputValue: this.data.inputValue,
          //checkboxValue: this.data.checkboxValue
        },
        method: "get",//post
        //header:{}
        success:function(res){
          wx.showToast({
            title: res.data.data.ms,
            icon:"success",
            duration: 2000
          })
        }
      })
    }else{
      wx.showModal({
        title:"请您完整填写反馈信息",
        content: "在这儿填",
        confirmText: "好的",
        cancelText: "不填了",
        success:(res)=>{
          if(res.confirm){
            //continue
          }else{
            console.log('back')
            wx.navigateBack({
              delta: 1//回退到delta页面，默认值为1
            })
          }
        }
      })
    }
  },

  bindCamera:function(){
    wx.chooseImage({
      count: 4,
      sizeType: ['original','compressed'],
      sourceType:['album','camera'],
      success: function(res) {
        let tfps =res.temFilePath;
        let _picUrls =this.data.picUrls;
        //这里先保存到本地，如果要上传到服务器，需要调用API上传图片而不是本地路径，就是picUrls数组
        for(let item of tfps){
          _picUrls.push(item);
          this.setData({
            picUrls: _picUrls,
            actionText: "+"
          });
        }
      },
    })
  },

  //删除选择的雨伞照片
  delPic: function(e){
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index,1);
    this.setData({
      picUrls: _picUrls
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})