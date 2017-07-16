// pages/charge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '充值',
    })
  },

  //存储当前输入的充值金额
  bindInput: function(res){
    this.setData({
      inputValue: res.detail.value
    })
  },

  charge: function(){
    //必须输入大于0的数字
    if(parseInt(this.data.inputValue)<=0 || isNaN(this.data.inputValue)){
      wx.showModal({
        title: '警告',
        content: '是不是还得倒贴给您？',
        showCancel: false,
        confirmText: '不用不用'
      })
    }else{
      wx.redirectTo({
        url: '../wallet/index',
        success:(res)=>{
          wx.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
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
  //页面销毁 更新本地金额，累加
  wx.getStorage({
    key: 'overage',
    success: function(res) {
      wx.setStorage({
        key: 'overage',
        data: {
          overage: parseInt(this.data.inputValue) + parseInt(res.data.overage)
        },
      })
    },
    //如果没有本地金额，则设置本地金额
    fail: (res)=>{
      wx.setStorage({
        key: 'overage',
        data: {
          overage: parseInt(this.data.inputValue)
        },
      })
    }
  })
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