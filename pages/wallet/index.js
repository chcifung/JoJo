// pages/wallet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overage: 0,//初始状态下充值0元，0张优惠券
    ticket: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //加载完成后，更新本地存储的overage
    wx.getStorage({
      key:'overage',
      success:(res)=>{
        this.setData({
          overage: res.data.overage
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //获取本地存储的overage
    wx.getStorage({
      key: 'overage',
      success: function(res) {
        this.setData({
          overage: res.data.overage
        })
      },
    })
  },

  //余额说明
  overageDesc: function(){
    wx.showModal({
      title: '',
      content: '充值余额0.00元+活动赠送余额0.00元',
      showCancel: false,
      confirmText:"我知道了",
    })
  },

  //跳转到充值页面
  movetoCharge: function(){
    //先关闭当前页面，跳转到指定页面，返回时也不会再到当前页面
    wx.redirectTo({
      url: '../charge/index',
    })
  },

  //优惠券-用伞券
  showTicket: function(){
    wx.showModal({
      title: '',
      content:"您没有可用优惠券",
      showCancel: false,
      confirmText: "好吧",
    })
  },

  //押金退还
  showDeposit:function(){
    wx.showModal({
      title: '',
      content: '押金会立刻退回，退款后，您将不能继续使用JoJo共享雨伞，确认要继续退款吗？',
      cancelText:'继续使用',
      cancelColor: "#b9dd08",
      confirmText:'押金退款',
      confirmColor: '#ccc',
      success:(res)=>{
        if(res.confirm){
          wx.showToast({
            title:'退款成功，预计1-3个工作日到账',
            icon:'success',
            duration: 2000
          })
        }
      }
    })
  },

  //关于JoJo伞
    showInvcode: function(){
      wx.showModal({
        title: 'JoJo共享雨伞',
        content: '微信服务号：jojo-umbrella,网址：m.jojo.com',
        showCancel: false,
        confirmText: '666'
      })
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