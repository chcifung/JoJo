// pages/scanresult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取借伞密码
    console.log(options);//{password:"",number:""}
    this.setData({
      password: options.password
    });
    //设置初始计时秒数
    let time=15;
    //开始定时器
    this.timer = setInterval(()=>{
      this.setData({
        time: --time
      });
      //读完秒后携带借伞的号码跳转到计费页面
      if(time = 0){
        clearInterval(this.time);
        wx.redirectTo({
          url: '../billing/index?number='+options.number,
        })
      }
    },1000)
  },
  //点击回到首页报障
  moveToWarn: function(){
    //清空浏览器
    clearInterval(this.timer);
    wx.redirectTo({
      url: '../index/index',
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