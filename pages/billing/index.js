// pages/billing/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    hours: 0,
    minuters: 0,
    seconds: 0,
    billing: "正在计费"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取伞编号，设置定时器
    this.setData({
      number: options.number,
      timer: this.timer
    });
    //初始化计时器
    let d =0;
    let h =0;
    let m =0;
    let s =0;
    //开始计时
    this.timer = setInterval(() =>{
      this.setData({
        seconds: s++
      })
      if( s==60){
        s =0;
        m++;
        setTimeout(() =>{
          this.setData({
            minuters: m
          });
        },1000)
        if( m==60){
          m=0;
          h++;
          setTimeout(()=>{
            this.setData({
              hours:h
            });
          },1000)
          if(h==24){
            h=0;
            d++;
            setTimeout(()=>{
              this.setData({
                days: d
              });
            },1000)
          }
        }
      }
    },1000)
  },

  endUmb: function(){
    clearInterval(this.timer);
    this.timer ="";
    this.setData({
      billding:"本次借伞时长",
      disabled: true
    })
  },

  //携带定时器状态返回地图
  moveToIndex: function(){
    //如果定时器为空
    if(this.timer ==""){
      //直接关闭计费页面跳到地图
      wx.redirectTo({
        url: '../index/index',
      })
      //否则保留计费页回到地图
    }else{
      wx.navigateTo({
        url: '../index/index?timer=' + this.timer,
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