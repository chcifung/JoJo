// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,//缩放级别
    latitude: 0,//默认纬度
    longitude: 1//默认经度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //页面初始化 option是页面跳转所带来的参数

  //获取定时器，用于判断是否开始计费
  this.timer = options.timer;

  //调用wx.getLocation系统API，获取并设置用户当前位置、速度
    wx.getLocation({
      type: "gcj02", //返回坐标的类型
      //获取经纬度成功回调
      success: (res) => {//es6箭头函数，可以解绑当前作用域的this语句，使得下面的this可以绑定到page对象
        console.log(res);//查看当前res
        this.setData({//给data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示出我们的真实位置
        longitude: res.longitude,
        latitude: res.latitude
        })
      }
    });
    wx.request({
      url: 'https://16652590.qcloud.la/WeixinRest/wxtest',
      success: (res) =>{
        console.log(res.data);
      }
    });
    //设置地图控件的位置以及大小，通过设备宽高定位
    wx.getSystemInfo({//系统API，获取系统信息，设备宽高等
      data: [],
      success: (res) => {
        console.log(res);
        this.setData({
          //定义控件数组，可以在data对象初始化为【】，以便更好的阅读
          controls: [{
            id: 1,//给控件的唯一ID
            iconPath:'/pages/images/location.png',//控件图标的位置
            position: {//控件位置
              left: 20,//单位px
              top: res.windowHeight -100,//根据设备高度设置top值
              width: 50,//控件大小
              height: 50
            },
            clickable: true//控件是否可以点击
          },
          {
            id: 2,
            iconPath:'/pages/images/use.png',
            position:{
              left: res.windowWidth/2 -45,
              top: res.windowHeight - 100,
              width: 90,
              height: 90
            },
            clickable: true,
          },
          {
            id: 3,
            iconPath: '/pages/images/warn.png',
            position: {
              left: res.windowWidth -70,
              top: res.windowHeight -80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 4,
            iconPath: '/pages/images/marker.png',
            position: {
              left: res.windowHeight/2 -11,
              top: res.windowHeight/2 -45,
              width: 44,
              height: 44
            },
            clickable: false
          },
          {
            id: 5,
            iconPath: '/pages/images/avatar.png',
            position:{
              left: res.windowWidth -68,
              top: res.windowHeight -155,
              width: 45,
              height: 45
            },
            clickable: true
          }]
        })
      }
    });
    wx.request({
      //请求服务器，显示附近的便利店有伞情况,用marker标记
      url: 'https://16652590.qcloud.la/WeixinRest/wxtest',
      data:{},
      method:"GET",
      success: (res) =>{
        this.setData({
          markers: res.data.data
        })
      }
    })
  },


//地图控件点击事件
bindcontroltap:function(e){
  //判断点击的是哪个控件 e.controlId代表控件的ID
  switch(e.controlId){
    //点击定位按钮
    case 1:
      this.movetoPosition();
      break;
    //点击立即用伞按钮,如果没计费就调用摄像头扫码
    case 2:
      if(this.timer===""||this.timer===undefined){
        //如果没开始计费就扫码
        wx.scanCode({
          success:(res) =>{
            //正在获取密码通知
            wx.showLoading({
              title: '正在获取用伞密码',
              mask: true
            })
            //请求服务器获取密码和车号
            wx.request({
              url: 'https://16652590.qcloud.la/WeixinRest/wxtest',
              data:{},
              method:'GET',
              success: (res) =>{
                //如果请求成功，就隐藏等待框
                wx.hideLoading();
                //携带密码和伞编号跳转到密码页
                wx.redirectTo({
                  url: '../scanresult/index?password=' + res.data.data.password +'&number=' + res.data.data.number,
                  success: (res) =>{
                    wx.showToast({
                      title: '获取密码成功',
                      duration: 1000
                    })
                  }
                })
              }
            })
          }
        })
        //当前已经在计费就回退到计费页
      }else{
        wx.navigateBack({
          delta: 1
        })
      }
      break;
      //故障客服按钮页面
      case 3:
        wx.navigateTo({
          url: '../warn/index'
        });
        break;
      //个人中心按钮
      case 5:
        wx.navigateTo({
          url: '../my/index'
        });
        break;
      default:
        break;
    }
  },

  //地图标记点击事件，链接用户和雨伞所在便利店的位置情况
  bindmarkertap: function(e){
    let _markers = this.data.markers;//拿到标记数组
    let markerId = e.markerId;//获取点击的标记ID
    let currMarker = _markers[markerId];//通过ID获取当前的点击标记
    this.setData({
      polyline:[{
        points:[
          {
          longitude: this.data.longitude,
          latitude: this.data.latitude
        },
        {
          longitude: currMarker.longitude,
          latitude: currMarker.latitude
        }],
        color: "#FF0000DD",
        width: 1,
        dottedLine: true
      }],
      scale: 18
    })
  },

  //地图视野改变事件
  bindregionchange: function(e){
    //拖动地图，获取附近雨伞或便利店的位置
    if(e.type =="begin"){
      wx.request({
        url: 'https://16652590.qcloud.la/WeixinRest/wxtest',
        data: {},
        method: "GET",
        success: (res) =>{
          this.setData({
            _markers: res.data.data
          })
        }
      })
    }else if(e.type =="end"){
      this.setData({
        markers: this.data._markers
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
    //创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("JoMap");
    this.movetoPosition()
  },
  //定义定位函数
  movetoPosition: function(){
    this.mapCtx.moveToLocation();
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