// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    userInfo:{
      avatarUrl: "",
      nickName: "未登录"
    },
    bType: "primary",//按钮的类型
    actionText: "登录",//按钮文字提示
    lock: false //登录按钮状态，false表示未登录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置本页导航标题
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    //获取本地用户信息
    wx.getStorage({
      key: 'userInfo',
      //能获取到的则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res)=> {
        console.log(res);
        wx.hideLoading();
          this.setData({
          userInfo:{
            avatarUrl: res.data.userInfo.avatarUrl,
            nickName: res.data.userInfo.nickName
          },
          bType: res.data.bType,
          actionText: res.data.actionText,
          lock: true
        })
      },
    });
  },
  //登录或者退出登录按钮点击事件
  bindAction: function(){
    this.data.lock =!this.data.lock;
    //如果没有登录，登录按钮操作
    if(this.data.lock){
      wx.showLoading({
        title:"正在登录"
      });
      wx.login({
        success:(res)=>{
          wx.hideLoading();
          wx.getUserInfo({
            withCredentials: false,
            success: (res)=>{
              this.setData({
                userInfo:{
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
                },
                bType: "warn",
                actionText: "退出登录"
              });
              //把用户信息存储到本地
              wx.setStorage({//真实情况下需要使用session
                key: 'userInfo',
                data: {
                  userInfo:{
                    avatarUrl: res.userInfo.avatarUrl,
                    nickName: res.userInfo.nickName
                  },
                  bType: "warn",
                  actionText: "退出登录"
                },
                success:(res)=>{
                  console.log("存储成功")
                }
              })
            }
          })
        }
      })
    }else{
      //如果已经登录，退出登录按钮操作
      wx.showModal({
        title: '确认退出？',
        content: '退出后将不能再使用JoJo雨伞哦',
        success:(res)=>{
          if(res.confirm){
            console.log("确认");
            wx.removeStorageSync('userInfo');
            this.setData({
              userInfo:{
                avatarUrl:"",
                nickName:"未登录"
              },
              bType: "primary",
              actionText:"登录"
            })
          }else{
            console.log("cancel");
            this.setData({
              lock: true
            })
          }
        }
      })
    }
  },
  //跳转到钱包页面
  movetoWallet: function(){
    wx.navigateTo({
      url: '../wallet/index',
    })
  },

  /*** 生命周期函数--监听页面初次渲染完成
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